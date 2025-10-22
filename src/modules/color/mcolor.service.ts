import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateColorDto } from "./dto/create-color.dto";
import { UpdateColorDto } from "./dto/update-color.dto";
import { ColorEntity } from "./entities/color.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>
  ) {}
  async create(createColorDto: CreateColorDto): Promise<ColorEntity> {
    const color = this.colorRepository.create(createColorDto);
    return await this.colorRepository.save(color);
  }

  async findAll(): Promise<ColorEntity[]> {
    return await this.colorRepository.find();
  }

  async getExistingColor(criteria: FindOneOptions): Promise<ColorEntity> {
    const color = await this.colorRepository.findOne(criteria);

    if (!color) {
      throw new NotFoundException({
        message: `Não foi possível encontrar a cor com os seguintes critérios: ${criteria.where}`,
      });
    }

    return color;
  }

  async findOne(id: string): Promise<ColorEntity> {
    const color = await this.colorRepository.findOne({ where: { id } });
    if (!color) {
      throw new NotFoundException("Cor não encontrada");
    }
    return color;
  }

  async update(
    id: string,
    updateColorDto: UpdateColorDto
  ): Promise<ColorEntity> {
    const color = await this.getExistingColor({
      where: { id: id },
    });

    await this.colorRepository.update(color.id, updateColorDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const color = await this.findOne(id);
    await this.colorRepository.remove(color);
  }
}
