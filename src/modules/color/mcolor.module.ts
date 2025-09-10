import { Module } from "@nestjs/common";
import { ColorService } from "./mcolor.service";
import { ColorController } from "./mcolor.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColorEntity } from "./entities/color.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ColorEntity])],
  controllers: [ColorController],
  providers: [ColorService],
})
export class ColorModule {}
