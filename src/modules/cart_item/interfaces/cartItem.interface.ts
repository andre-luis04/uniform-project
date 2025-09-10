export interface ICartItem {
  id: string;
  quantity: number;
  variant_id: string;
  created_at: Date;
  updated_at?: Date;
}
