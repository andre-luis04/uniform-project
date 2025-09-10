import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async create(createUserDto: CreateUserDto): Promise<void> {
    const user = await this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    const client = await this.userRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException("Cliente não encontrado");
    }
    return client;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const client = await this.findOne(id);
    await this.userRepository.update(client.id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
