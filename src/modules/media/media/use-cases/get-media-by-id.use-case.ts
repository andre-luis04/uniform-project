import { HttpException, Inject, Injectable } from "@nestjs/common";
import { type AxiosInstance, AxiosResponse } from "axios";

@Injectable()
export class GetMediaByIdUseCase {
  constructor(@Inject("MEDIA_API") private readonly mediaApi: AxiosInstance) {}

  async execute(id: string): Promise<AxiosResponse<any, any>> {
    return await this.mediaApi
      .get(`/media/${id}`, {
        responseType: "stream",
      })
      .catch((error) => {
        throw new HttpException(
          error.response.data.message,
          error.response.data.status
        );
      });
  }
}
