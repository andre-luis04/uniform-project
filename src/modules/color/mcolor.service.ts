import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateColorDto } from "./dto/create-color.dto";
import { UpdateColorDto } from "./dto/update-color.dto";
import { ColorEntity } from "./entities/color.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>
  ) {}
  async create(createColorDto: CreateColorDto): Promise<void> {
    const color = this.colorRepository.create(createColorDto);
    await this.colorRepository.save(color);
  }

  async findAll(): Promise<ColorEntity[]> {
    return await this.colorRepository.find();
  }

  async findOne(id: string): Promise<ColorEntity> {
    const color = await this.colorRepository.findOne({ where: { id } });
    if (!color) {
      throw new NotFoundException("Cor não encontrada");
    }
    return color;
  }

  async update(id: string, updateColorDto: UpdateColorDto): Promise<void> {
    const color = await this.findOne(id);
    await this.colorRepository.update(color.id, updateColorDto);
  }

  async remove(id: string): Promise<void> {
    const color = await this.findOne(id);
    await this.colorRepository.remove(color);
  }
}
