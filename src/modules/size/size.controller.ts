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
import { SizeService } from "./size.service";
import { CreateSizeDto } from "./dto/create-size.dto";
import { UpdateSizeDto } from "./dto/update-size.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";

@ApiTags("Size")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("admin")
@Controller("admin/size")
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post()
  @ApiOperation({ description: "cria um tamanho" })
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizeService.create(createSizeDto);
  }

  @Get()
  @ApiOperation({ description: "encontra todos os tamanhos" })
  findAll() {
    return this.sizeService.findAll();
  }

  @Get(":id")
  @ApiOperation({ description: "encontra um tamanho pelo id" })
  findOne(@Param("id") id: string) {
    return this.sizeService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ description: "altera um tamanho" })
  update(@Param("id") id: string, @Body() updateSizeDto: UpdateSizeDto) {
    return this.sizeService.update(id, updateSizeDto);
  }

  @Delete(":id")
  @ApiOperation({ description: "exclui um tamanho" })
  remove(@Param("id") id: string) {
    return this.sizeService.remove(id);
  }
}
