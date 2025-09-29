import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { type AxiosInstance } from "axios";
import FormData from "form-data";

@Injectable()
export class UploadMediasUseCase {
  constructor(@Inject("MEDIA_API") private readonly mediaApi: AxiosInstance) {}

  async execute(
    files: Array<Express.Multer.File>,
    pathConfigurationId: string
  ): Promise<Array<string>> {
    if (!Array.isArray(files) || files.length === 0) {
      throw new BadRequestException("É necessário enviar arquivo(s).");
    }

    if (!pathConfigurationId) {
      throw new BadRequestException(
        "É necessário enviar o pathConfigurationId."
      );
    }

    const form = new FormData();

    for (const file of files) {
      form.append("files", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
    }

    const response = await this.mediaApi
      .post(`/media/${String(pathConfigurationId)}`, form)
      .catch((error) => {
        throw new HttpException(
          error.response.data.message,
          error.response.data.status
        );
      });

    const inserted = response.data.inserted || [];
    return inserted.map((media: { id: string }) => media.id);
  }
}
