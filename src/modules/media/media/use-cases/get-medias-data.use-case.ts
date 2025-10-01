import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { type AxiosInstance } from "axios";
import { IMedia } from "../interfaces/media.interface";
import { IMediaItem } from "src/shared/interfaces/media-item.interface";

@Injectable()
export class GetMediasDataUseCase {
  constructor(@Inject("MEDIA_API") private readonly mediaApi: AxiosInstance) {}

  async execute(mediasIds: string[]): Promise<{ medias: IMediaItem[] }> {
    if (!Array.isArray(mediasIds)) {
      throw new BadRequestException("Ids de mídias inválidos.");
    }

    if (mediasIds.length === 0) {
      return { medias: [] };
    }

    try {
      const response = await this.mediaApi.get(
        `/media/data/${mediasIds.join(",")}`
      );
      const medias = response.data.medias || [];

      const enrichedMedias: IMediaItem[] = medias.map((media: IMedia) => ({
        ...media,
      }));

      return { medias: enrichedMedias };
    } catch (error: any) {
      throw new HttpException(
        error.response?.data?.message || "Erro ao buscar mídias.",
        error.response?.data?.status || 500
      );
    }
  }
}
