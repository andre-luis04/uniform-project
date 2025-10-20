import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  ParseUUIDPipe,
} from "@nestjs/common";
import { SizeService } from "./size.service";
import { CreateSizeDto } from "./dto/create-size.dto";
import { UpdateSizeDto } from "./dto/update-size.dto";
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
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

  @ApiResponse({
    status: 204,
    description: "No Content",
  })
  @HttpCode(204)
  @ApiOperation({ description: "cria um tamanho", summary: "Criar um tamanho" })
  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizeService.create(createSizeDto);
  }

  @ApiResponse({
    status: 200,
    description: "tamanhos retornados com sucesso",
    content: {
      "application/json": {
        example: [
          {
            created_at: "2025-10-13T16:49:13.368Z",
            updated_at: "2025-10-13T16:49:13.368Z",
            id: "f162c3d5-e085-4fa4-a5f3-df468b191995",
            size: "XG",
          },
          {
            created_at: "2025-10-08T20:26:57.275Z",
            updated_at: "2025-10-08T20:26:57.275Z",
            id: "7cdc6daf-8bfa-4921-aa53-af03469039d2",
            size: "P",
          },
        ],
      },
    },
  })
  @ApiOperation({
    description: "encontra todos os tamanhos cadastrados",
    summary: "Listar todos os tamanhos",
  })
  @Get()
  findAll() {
    return this.sizeService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: "tamanho especificado retornado com sucesso",
    content: {
      "application/json": {
        example: [
          {
            created_at: "2025-10-08T20:26:57.275Z",
            updated_at: "2025-10-08T20:26:57.275Z",
            id: "7cdc6daf-8bfa-4921-aa53-af03469039d2",
            size: "P",
          },
        ],
      },
    },
  })
  @ApiNotFoundResponse({ description: "**Tamanho não encontrado**" })
  @ApiOperation({
    description: "encontra um tamanho pelo id",
    summary: "Retorna um tamanho pelo ID",
  })
  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.sizeService.findOne(id);
  }

  @ApiResponse({
    status: 204,
    description: "No Content",
  })
  @ApiNotFoundResponse({ description: "**Tamanho não encontrado**" })
  @HttpCode(204)
  @ApiOperation({
    description: "altera um tamanho",
    summary: "Alterar um tamanho",
  })
  @Patch(":id")
  update(@Param("id", ParseUUIDPipe) id: string, @Body() updateSizeDto: UpdateSizeDto) {
    return this.sizeService.update(id, updateSizeDto);
  }

  @ApiResponse({
    status: 204,
    description: "No Content",
  })
  @ApiNotFoundResponse({ description: "**tamanho não encontrado**" })
  @HttpCode(204)
  @ApiOperation({
    description: "exclui um tamanho",
    summary: "Deletar um tamanho",
  })
  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.sizeService.remove(id);
  }
}
