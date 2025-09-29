import { Module } from "@nestjs/common";
import { ProductVariantsService } from "./variants.service";
import { UserProductVariantsController } from "./user.variants.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductVariantEntity } from "./entities/product.variant.entity";
import { AdmProductVariantsController } from "./adm.variants.controller";
import { MediaApiModule } from "../media/media/media-api.module";
import { MediaPathConfigModule } from "src/configurations/media-path/media-path-config.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductVariantEntity]),
    MediaApiModule,
    MediaPathConfigModule,
  ],
  controllers: [UserProductVariantsController, AdmProductVariantsController],
  providers: [ProductVariantsService],
  exports: [ProductVariantsService],
})
export class ProductVariantsModule {}
