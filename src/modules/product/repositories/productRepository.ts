import { DataSource, Repository } from "typeorm";
import { ProductEntity } from "../entities/productEntity";
import { Iproduct } from "../interfaces/Iproduct";
import { Inject, Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class ProductRepository implements Iproduct {

    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
        @InjectRepository(ProductEntity)
        private readonly repository : Repository<ProductEntity>,
    
    ) {}

    async createProduct(product: ProductEntity) : Promise<void> {
        await this.repository.save(product);
    }

    async listProducts(limit: number, offset: number): Promise<ProductEntity[]> {
        const result = await this.dataSource.query(
            'SELECT * FROM product ORDER BY id LIMIT $1 OFFSET $2', 
            [limit, offset]
        );
        return result;
    }
    async getProduct(id: string): Promise<ProductEntity | null>{
        return await this.repository.findOne({where : {id}});
    }
    async updateProduct(product: ProductEntity): Promise<void>{
        await this.repository.save(product);
    }
    async deleteProduct(product : ProductEntity): Promise<void>{
        await this.repository.remove(product);
    }
}