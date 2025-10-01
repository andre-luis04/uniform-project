import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductVariantDto } from "./dto/create-product.variant.dto";
import { UpdateProductVariantDto } from "./dto/update-product.variant.dto";
import { ProductVariantEntity } from "./entities/product.variant.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductVariantResponseDto } from "./dto/response-product.variant.dto";
import { OnEvent } from "@nestjs/event-emitter";
import { IncreaseStockDto } from "./dto/increase.stock.dto";
import { MediaPathConfigService } from "src/configurations/media-path/media-path-config.service";
import { UploadMediasUseCase } from "../media/media/use-cases/upload-medias.use-case";
import { RemoveMediasUseCase } from "../media/media/use-cases/remove-medias.use-case";
import { injectMultipleMedias } from "src/shared/helpers/inject-multiple-medias.helper";
import { GetMediasDataUseCase } from "../media/media/use-cases/get-medias-data.use-case";

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectRepository(ProductVariantEntity)
    private readonly productVariantsRepository: Repository<ProductVariantEntity>,
    private readonly uploadMediasUseCase: UploadMediasUseCase,
    private readonly removeMediasUseCase: RemoveMediasUseCase,
    private readonly mediaPathConfigService: MediaPathConfigService,
    private readonly getMediasDataUseCase: GetMediasDataUseCase
  ) {}
  async create(
    createProductVariantDto: CreateProductVariantDto,
    files?: Array<Express.Multer.File>
  ): Promise<void> {
    const mediaIds: string[] = [];
    try {
      const productVariant = this.productVariantsRepository.create(
        createProductVariantDto
      );

      if (files && files?.length > 0) {
        const uploadedMediaIds = await this.uploadMediasUseCase.execute(
          files,
          this.mediaPathConfigService.productVariantPath
        );

        mediaIds.push(...uploadedMediaIds);
        productVariant.ids_media = uploadedMediaIds;
      }

      await this.productVariantsRepository.save(productVariant);
    } catch (error: unknown) {
      if (mediaIds.length > 0) {
        await this.removeMediasUseCase.execute(mediaIds);
      }

      if (error instanceof Error)
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
  }

  async findAllByProduct(productId: string) {
    const items = await this.productVariantsRepository.find({
      where: { id_product: productId },
      relations: { color: true, product: true, size: true },
      select: {
        id: true,
        color: { id: true, color: true },
        size: { id: true, size: true },
        product: { id: true, name: true },
        price: true,
        ids_media: true,
      },
      order: { created_at: { direction: "ASC" } },
    });

    const enrichedData = await injectMultipleMedias(items, async (ids) => {
      const { medias } = await this.getMediasDataUseCase.execute(ids);
      return medias;
    });

    return enrichedData;
  }

  async findAll(): Promise<ProductVariantEntity[]> {
    const items = await this.productVariantsRepository.find({
      relations: { color: true, product: true, size: true },
      select: {
        id: true,
        color: { id: true, color: true },
        size: { id: true, size: true },
        product: { id: true, name: true },
        price: true,
        stock: true,
      },
      order: { created_at: { direction: "ASC" } },
    });
    return items;
  }

  async findOne(id: string): Promise<ProductVariantEntity> {
    const productVariant = await this.productVariantsRepository.findOne({
      where: { id },
      relations: { color: true, product: true, size: true },
    });
    if (!productVariant) {
      throw new NotFoundException("produto não encontrado");
    }
    return productVariant;
  }

  async update(
    id: string,
    updateProductVariantDto: UpdateProductVariantDto
  ): Promise<void> {
    const productVariant = await this.findOne(id);
    await this.productVariantsRepository.update(
      productVariant.id,
      updateProductVariantDto
    );
  }

  async remove(id: string): Promise<void> {
    const productVariant = await this.findOne(id);
    await this.productVariantsRepository.remove(productVariant);
  }

  async validateStock(idItem: string, quantity: number): Promise<void> {
    const productVariant = this.findOne(idItem);

    if (((await productVariant).stock ?? 0) < quantity) {
      throw new BadRequestException("estoque insuficiente");
    }
  }

  async decreaseStock(idItem: string, quantity: number): Promise<void> {
    console.log(`Atualizando estoque do item ${idItem} em -${quantity}`);
    const productVariant = await this.findOne(idItem);
    const stock = productVariant.stock || 0;

    if (quantity > stock) {
      throw new BadRequestException("estoque indisponivel");
    }
    const newStock = stock - quantity;

    await this.productVariantsRepository.update(productVariant.id, {
      stock: newStock,
    });
  }

  async increaseStock(
    idItem: string,
    quantity: IncreaseStockDto
  ): Promise<void> {
    const productVariant = await this.findOne(idItem);
    const stock = productVariant.stock;

    const newStock = stock + quantity.quantity;

    await this.productVariantsRepository.update(productVariant.id, {
      stock: newStock,
    });
  }
}
