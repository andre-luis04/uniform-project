import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MediaPathConfigService {
  constructor(private readonly configService: ConfigService) {}

  get productVariantPath(): string {
    const path = this.configService.get<string>("mediaPath.productVariant");
    if (!path) {
      throw new InternalServerErrorException(
        "PRODUCT_VARIANT_PATH is not defined."
      );
    }
    return path;
  }
}
