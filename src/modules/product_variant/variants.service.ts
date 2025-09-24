import {
  BadRequestException,
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

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectRepository(ProductVariantEntity)
    private readonly productVariantsRepository: Repository<ProductVariantEntity>
  ) {}
  async create(
    createProductVariantDto: CreateProductVariantDto
  ): Promise<void> {
    const productVariant = this.productVariantsRepository.create(
      createProductVariantDto
    );
    await this.productVariantsRepository.save(productVariant);
  }

  async findAllByProduct(productId: string): Promise<ProductVariantEntity[]> {
    const items = await this.productVariantsRepository.find({
      where: { id_product: productId },
      relations: { color: true, product: true, size: true },
      select: {
        id: true,
        color: { id: true, color: true },
        size: { id: true, size: true },
        product: { id: true, name: true },
        price: true,
      },
      order: { created_at: { direction: "ASC" } },
    });
    return items;
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

  async updateStock(idItem: string, quantity: number): Promise<void> {
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
}
