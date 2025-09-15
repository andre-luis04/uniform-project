import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ColorService } from "./mcolor.service";
import { CreateColorDto } from "./dto/create-color.dto";
import { UpdateColorDto } from "./dto/update-color.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Color")
@Controller("color")
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.create(createColorDto);
  }

  @Get()
  findAll() {
    return this.colorService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.colorService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMcolorDto: UpdateColorDto) {
    return this.colorService.update(id, updateMcolorDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.colorService.remove(id);
  }
}
