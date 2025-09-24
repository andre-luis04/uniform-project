export interface IOrderListener {
  items: Array<{
    itemId: string;
    quantity: number;
  }>;
}
