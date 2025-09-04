import { ProductEntity } from "../entities/productEntity";

export interface Iproduct {

    createProduct(product : ProductEntity) : void;
    listProducts(limit: Number, offset : Number) : Promise<ProductEntity[]>;
    getProduct(id : string) : Promise<ProductEntity | null>;
    updateProduct(product: ProductEntity) : Promise<void>;
    deleteProduct(product : ProductEntity) : Promise<void>;
}