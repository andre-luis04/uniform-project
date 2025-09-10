import { IOrderVariant } from "../interfaces/order_variant.interface";

export class CreateOrderVariantDto implements Omit<IOrderVariant, "id"> {
  id_order: string;
  id_variant: string;
}
