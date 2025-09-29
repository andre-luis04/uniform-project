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
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";

@ApiTags("User")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("admin")
@Controller("admin/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    description:
      "rota para criar usuario, role não está explicito, mas como padrão é user normal",
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ description: "encontra todos os usuarios cadastrados" })
  findAll() {
    return this.userService.findAll();
  }

  @Get("with-deleted-user")
  @ApiOperation({
    description: "encontra todos os usuarios, inclusive quem foi excluido",
  })
  async findAllDeletedUser() {
    return await this.userService.findAllDeletedUser();
  }

  @Get(":id")
  @ApiOperation({ description: "encontra o usuario pelo seu id" })
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    description: "altera dados do usuario, pode ser alterado um ou mais",
  })
  update(@Param("id") id: string, @Body() updateMclientDto: UpdateUserDto) {
    return this.userService.update(id, updateMclientDto);
  }

  @Delete(":id")
  @ApiOperation({ description: "exclui usuario" })
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
