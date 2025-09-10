import { ICartItem } from "../interfaces/cartItem.interface";

export class CreateCartItemDto
  implements Omit<ICartItem, "id" | "created_at" | "updated_at">
{
  quantity: number;
  variant_id: string;
}
