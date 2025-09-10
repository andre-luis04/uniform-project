import { PartialType } from '@nestjs/swagger';
import { CreateOrderVariantDto } from './create-order_variant.dto';

export class UpdateOrderVariantDto extends PartialType(CreateOrderVariantDto) {}
