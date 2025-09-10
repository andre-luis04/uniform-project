import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { McartService } from "./mcart.service";
import { CreateMcartDto } from "./dto/create-mcart.dto";
import { UpdateMcartDto } from "./dto/update-mcart.dto";

@Controller("mcart")
export class McartController {
  constructor(private readonly mcartService: McartService) {}

  @Post()
  create(@Body() createMcartDto: CreateMcartDto) {
    return this.mcartService.create(createMcartDto);
  }

  @Get()
  findAll() {
    return this.mcartService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.mcartService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMcartDto: UpdateMcartDto) {
    return this.mcartService.update(id, updateMcartDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.mcartService.remove(id);
  }
}
