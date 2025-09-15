import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductVariantDto } from "./dto/create-product.variant.dto";
import { UpdateProductVariantDto } from "./dto/update-product.variant.dto";
import { ProductVariantEntity } from "./entities/product.variant.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductVariantResponseDto } from "./dto/response-product.variant.dto";

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

  async findAll(): Promise<ProductVariantResponseDto[]> {
    const items = await this.productVariantsRepository.find({
      relations: { color: true, product: true, size: true },
      order: { created_at: { direction: "ASC" } },
    });
    const response = items.map((item) => ({
      id: item.id,
      product: item.product.name,
      color: item.color.color,
      size: item.size.size,
      price: item.price,
    }));
    return response;
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
}
