import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { SizeEntity } from './entities/size.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(SizeEntity)
    private readonly sizeRepository: Repository<SizeEntity>,
  ) {}

  async create(createSizeDto: CreateSizeDto): Promise<void>{
    const size =  this.sizeRepository.create(createSizeDto);
    await this.sizeRepository.save(size);
  }

  async findAll() : Promise<SizeEntity[]> {
    return await this.sizeRepository.find(); 
  }

  async findOne(id: string): Promise<SizeEntity> {
    const size = await this.sizeRepository.findOne({where : {id}})
    if(!size){
      throw new NotFoundException('tamanho não encontrado');
    }
    return size;
  }

  async update(id: string, updateSizeDto: UpdateSizeDto): Promise<void> {
    const size = await this.findOne(id);
    await this.sizeRepository.update(size.id, updateSizeDto);
  }

  async remove(id: string): Promise<void> {
    const size = await this.findOne(id);
    await this.sizeRepository.remove(size);
  }
}
