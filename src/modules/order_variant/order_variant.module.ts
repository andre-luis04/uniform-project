import { Module } from "@nestjs/common";
import { OrderVariantService } from "./order_variant.service";
import { OrderVariantController } from "./order_variant.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderVariantEntity } from "./entities/order_variant.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrderVariantEntity])],
  controllers: [OrderVariantController],
  providers: [OrderVariantService],
})
export class OrderVariantModule {}
