import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { type AxiosInstance } from "axios";

@Injectable()
export class RemoveMediasUseCase {
  constructor(@Inject("MEDIA_API") private readonly mediaApi: AxiosInstance) {}

  async execute(mediaIds: string[]): Promise<void> {
    if (!mediaIds || !Array.isArray(mediaIds) || mediaIds.length === 0) {
      throw new BadRequestException("Ids de mídias inválidos.");
    }

    await this.mediaApi
      .delete(`/media/${mediaIds.join(",")}`)
      .catch((error) => {
        throw new HttpException(
          error.response.data.message,
          error.response.data.status
        );
      });
  }
}
