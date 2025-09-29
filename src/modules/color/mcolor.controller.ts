import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ColorService } from "./mcolor.service";
import { CreateColorDto } from "./dto/create-color.dto";
import { UpdateColorDto } from "./dto/update-color.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";

@ApiTags("Color")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("admin")
@Controller("admin/color")
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  @ApiOperation({ description: "cria uma cor" })
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.create(createColorDto);
  }

  @Get()
  @ApiOperation({ description: "encontra todas as cores" })
  findAll() {
    return this.colorService.findAll();
  }

  @Get(":id")
  @ApiOperation({ description: "encontra a cor pelo seu id" })
  findOne(@Param("id") id: string) {
    return this.colorService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ description: "altera uma cor" })
  update(@Param("id") id: string, @Body() updateMcolorDto: UpdateColorDto) {
    return this.colorService.update(id, updateMcolorDto);
  }

  @Delete(":id")
  @ApiOperation({ description: "exclui uma cor" })
  remove(@Param("id") id: string) {
    return this.colorService.remove(id);
  }
}
