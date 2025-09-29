import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "./entities/productEntity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<void> {
    const product = this.productRepository.create(createProductDto);

    await this.productRepository.save(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find({
      relations: {
        productVariant: true,
      },
      select: {
        productVariant: {
          id: true,
          ids_media: true,
        },
      },
    });
  }

  async findOne(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException("produto não encontrado");
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.update(product.id, updateProductDto);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
