import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.UserService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.UserService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.UserService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMclientDto: UpdateUserDto) {
    return this.UserService.update(id, updateMclientDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.UserService.remove(id);
  }
}
