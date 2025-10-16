import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("User")
@ApiBearerAuth()
@Controller("admin/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(204)
  @Post()
  @ApiOperation({
    description:
      "rota para criar usuario, role não está explicito, mas como padrão é user normal",
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
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
  findAll() {
    return this.userService.findAll();
  }

  @Get("with-deleted-user")
  @ApiResponse({
    status: 200,
    description: "Lista de usuários (com possiveis usuarios deletados) retornada com sucesso",
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
  async findAllDeletedUser() {
    return await this.userService.findAllDeletedUser();
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    description: "usuário retornado com sucesso",
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
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @HttpCode(204)
  @Patch(":id")
  @ApiOperation({
    description: "altera dados do usuario, pode ser alterado um ou mais",
  })
  update(@Param("id") id: string, @Body() updateMclientDto: UpdateUserDto) {
    return this.userService.update(id, updateMclientDto);
  }

  @HttpCode(204)
  @Delete(":id")
  @ApiOperation({ description: "exclui usuario" })
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
