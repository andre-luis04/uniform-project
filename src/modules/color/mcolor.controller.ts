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
import { ColorService } from "./mcolor.service";
import { CreateColorDto } from "./dto/create-color.dto";
import { UpdateColorDto } from "./dto/update-color.dto";
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

@ApiTags("Color")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("admin")
@Controller("admin/color")
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @ApiResponse({
    status: 204,
    description: "No Content",
  })
  @HttpCode(204)
  @Post()
  @ApiOperation({
    description: "cria uma cor",
    summary: "Adicionar uma nova cor",
  })
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.create(createColorDto);
  }

  @ApiResponse({
    status: 200,
    description: "cores cadastradas retornadas com sucesso",
    content: {
      "application/json": {
        example: [
          {
            created_at: "2025-10-08T20:27:03.773Z",
            updated_at: "2025-10-08T20:27:03.773Z",
            id: "e24b5f3f-2104-4066-a69c-3c9639a14f76",
            color: "Azul",
          },
          {
            created_at: "2025-10-13T16:49:25.581Z",
            updated_at: "2025-10-13T16:49:25.581Z",
            id: "ae2ad5e4-30df-4e17-8a7b-cc2e61f84dcf",
            color: "vermelho",
          },
        ],
      },
    },
  })
  @Get()
  @ApiOperation({
    description: "encontra todas as cores",
    summary: "Listar todas as cores",
  })
  findAll() {
    return this.colorService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: "cor especificada retornada com sucesso",
    content: {
      "application/json": {
        example: [
          {
            created_at: "2025-10-08T20:27:03.773Z",
            updated_at: "2025-10-08T20:27:03.773Z",
            id: "e24b5f3f-2104-4066-a69c-3c9639a14f76",
            color: "Azul",
          },
        ],
      },
    },
  })
  @ApiNotFoundResponse({ description: "**Cor não encontrada**" })
  @ApiOperation({
    description: "encontra a cor pelo seu id",
    summary: "Encontrar cor especifica pelo ID",
  })
  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.colorService.findOne(id);
  }

  @ApiResponse({
    status: 204,
    description: "No Content",
  })
  @ApiNotFoundResponse({ description: "**Cor não encontrada**" })
  @HttpCode(204)
  @ApiOperation({ description: "altera uma cor", summary: "Alterar uma cor" })
  @Patch(":id")
  update(@Param("id", ParseUUIDPipe) id: string, @Body() updateMcolorDto: UpdateColorDto) {
    return this.colorService.update(id, updateMcolorDto);
  }

  @ApiResponse({
    status: 204,
    description: "No Content",
  })
  @ApiNotFoundResponse({ description: "**Cor não encontrada**" })
  @HttpCode(204)
  @Delete(":id")
  @ApiOperation({ description: "exclui uma cor", summary: "Deletar uma cor" })
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.colorService.remove(id);
  }
}
