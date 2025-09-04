import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../repositories/productRepository";
import { ProductEntity } from "../entities/productEntity";


@Injectable()
export class ProductService {
    constructor(private readonly productRep : ProductRepository){}

    getAll(limit: number, offset: number) {
    return this.productRep.listProducts(limit, offset);
  }

  getOne(id: string) {
    return this.productRep.getProduct(id);
  }

  create(product: ProductEntity) {
    return this.productRep.createProduct(product);
  }

  async update(id: string, product : ProductEntity) : Promise<{success : boolean, message? : string}>{
    try{
        const productToUpdate = await this.productRep.getProduct(id);
        if (!productToUpdate) return {success : false, message : 'falha ao encontrar produto'}
        Object.assign(productToUpdate, product);
        await this.productRep.updateProduct(productToUpdate)
        return {success : true}
    }catch(err){
        console.error(err)
        return {success : false, message : 'falha ao atualizar produto'}
    }
  }

  async delete(id : string) :  Promise<{success : boolean, message? : string}>{
    try{
        const productToDelete = await this.productRep.getProduct(id);
        if(!productToDelete) return {success : false, message : 'falha ao encontrar produto'}
        await this.productRep.deleteProduct(productToDelete);
        return {success : true}
    }catch(err){
        console.error(err)
        return {success : false, message : 'falha ao deletar produto'}
    }
  }
}