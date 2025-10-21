import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Product")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("admin")
@Controller("admin/product")
export class AdmProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiResponse({
    status: 204,
    description: "No Content",
  })
  @ApiNotFoundResponse({ description: "**Produto não encontrado**" })
  @HttpCode(204)
  @ApiOperation({
    description: "cria um produto base",
    summary: "Criar um produto",
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<void> {
    return this.productService.create(createProductDto);
  }

  @ApiResponse({
    status: 204,
    description: "No Content",
  })
  @ApiNotFoundResponse({ description: "**Produto não encontrado**" })
  @HttpCode(204)
  @ApiOperation({
    description: "altera uma ou mais propriedades do produto",
    summary: "Alterar um produto",
  })
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<void> {
    return this.productService.update(id, updateProductDto);
  }

  @ApiResponse({
    status: 204,
    description: "No Content",
  })
  @ApiNotFoundResponse({ description: "**Produto não encontrado**" })
  @HttpCode(204)
  @Delete(":id")
  @ApiOperation({
    description: "exclui um produto",
    summary: "Deletar um produto",
  })
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }
}
