import { registerAs } from "@nestjs/config";

export default registerAs("mediaPath", () => ({
  productVariant: process.env.PRODUCT_VARIANT_PATH,
}));
