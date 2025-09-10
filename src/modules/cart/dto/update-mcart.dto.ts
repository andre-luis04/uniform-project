import { PartialType } from '@nestjs/swagger';
import { CreateMcartDto } from './create-mcart.dto';

export class UpdateMcartDto extends PartialType(CreateMcartDto) {}
