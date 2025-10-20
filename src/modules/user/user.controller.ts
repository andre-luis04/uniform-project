import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("User")
@ApiBearerAuth()
@Controller("admin/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 204,
    description: "No content",
  })
  @HttpCode(204)
  @ApiOperation({
    summary: "Criar usuario",
    description:
      "rota para criar usuario, role não está explicito, mas como padrão é user normal",
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiResponse({
    status: 200,
    description: "Lista de usuários retornada com sucesso",
    content: {
      "application/json": {
        example: [
          {
            id: "uuid",
            name: "João Silva",
            email: "joao@email",
            phone: "3522-0000",
          },
          {
            id: "uuid",
            name: "Maria Souza",
            email: "maria@email",
            phone: "4533-0000",
          },
        ],
      },
    },
  })
  @ApiOperation({
    summary: "Listar usuarios",
    description: "Lista todos os usuario",
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiResponse({
    status: 200,
    description:
      "Lista de usuários (com possiveis usuarios deletados) retornada com sucesso",
    content: {
      "application/json": {
        example: [
          {
            id: "uuid",
            name: "João Silva",
            email: "joao@email",
            phone: "3522-0000",
          },
          {
            id: "uuid",
            name: "Maria Souza",
            email: "maria@email",
            phone: "4533-0000",
          },
        ],
      },
    },
  })
  @ApiOperation({
    summary: "Listar usuarios ativos e deletados",
    description: "rota para listar usuarios ativos e deletados",
  })
  @Get("with-deleted-user")
  async findAllDeletedUser() {
    return await this.userService.findAllDeletedUser();
  }

  @ApiNotFoundResponse({ description: "**Usuario não encontrado**" })
  @ApiResponse({
    status: 200,
    description: "Usuário retornado com sucesso",
    content: {
      "application/json": {
        example: [
          {
            id: "uuid",
            name: "João Silva",
            email: "joao@email",
            phone: "3522-0000",
          },
        ],
      },
    },
  })
  @ApiOperation({
    summary: "Encontrar usuario pelo ID",
    description: "Encontra usuario pelo ID",
  })
  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @ApiResponse({
    status: 204,
    description: "No Content",
  })
  @ApiNotFoundResponse({ description: "**Usuario não encontrado**" })
  @HttpCode(204)
  @ApiOperation({
    description: "altera dados do usuario, pode ser alterado um ou mais",
    summary: "Alterar dados do usuário",
  })
  @Patch(":id")
  update(@Param("id", ParseUUIDPipe) id: string, @Body() updateMclientDto: UpdateUserDto) {
    return this.userService.update(id, updateMclientDto);
  }

  @ApiResponse({
    status: 204,
    description: "**No Content**",
  })
  @ApiNotFoundResponse({ description: "**Usuario não encontrado**" })
  @ApiOperation({
    description: "deleta usuario",
    summary: "deletar usuário",
  })
  @HttpCode(204)
  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
