import { Module } from "@nestjs/common";
import { McartService } from "./mcart.service";
import { McartController } from "./mcart.controller";
import { CartEntity } from "./entities/mcart.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItemModule } from "../cart_item/cart_item.module";

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), CartItemModule],
  controllers: [McartController],
  providers: [McartService],
})
export class McartModule {}
