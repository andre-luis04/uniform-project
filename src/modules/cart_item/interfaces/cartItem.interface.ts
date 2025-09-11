export interface ICartItem {
  id: string;
  quantity: number;
  id_variant: string;
  id_cart: string;
  created_at: Date;
  updated_at?: Date;
}
