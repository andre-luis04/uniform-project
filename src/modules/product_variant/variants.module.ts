import { Module } from "@nestjs/common";
import { ProductVariantsService } from "./variants.service";
import { UserProductVariantsController } from "./user.variants.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductVariantEntity } from "./entities/product.variant.entity";
import { AdmProductVariantsController } from "./adm.variants.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariantEntity])],
  controllers: [UserProductVariantsController, AdmProductVariantsController],
  providers: [ProductVariantsService],
  exports: [ProductVariantsService],
})
export class ProductVariantsModule {}
