import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CartEntity } from "../cart/entities/cart.entity";
import { CartService } from "../cart/cart.service";
import { ResponseUserDto } from "./dto/user.response.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private cartService: CartService
  ) {}
  async create(createUserDto: CreateUserDto): Promise<void> {
    const user = this.userRepository.create(createUserDto);

    await this.userRepository.save(user);

    await this.cartService.create({ id_user: user.id });
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find();

    const result = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      };
    });

    return result;
  }

  async findAllDeletedUser(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find({ withDeleted: true });

    const result = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      };
    });

    return result;
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("Cliente não encontrado");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException("email não cadastrado");
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const client = await this.findOne(id);
    await this.userRepository.update(client.id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);

    await this.userRepository.softDelete(user.id);
  }
}
