import { OnEvent } from "@nestjs/event-emitter";
import { ProductVariantsService } from "src/modules/product_variant/variants.service";
import { Injectable } from "@nestjs/common";
import type { IOrderListener } from "../interfaces/order.listener.interface";

@Injectable()
export class OrderListener {
  constructor(private readonly productVariantService: ProductVariantsService) {}

  @OnEvent("order.created")
  async handleOrderCreatedEvent(payload: IOrderListener) {
    payload.items.map((item) =>
      this.productVariantService.decreaseStock(item.itemId, item.quantity)
    );
  }
}
