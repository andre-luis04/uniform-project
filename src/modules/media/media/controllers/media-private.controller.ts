import { Controller, Get, Param, Res,  } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { mediaPrivateSwaggerDocumentation } from "../swagger/media-private.swagger";
import { GetMediaByIdUseCase } from "../use-cases/get-media-by-id.use-case";
import { type Response } from "express";

@ApiBearerAuth()
@ApiTags("Private - Media")
@Controller("media")
export class MediaPrivateController {
  constructor(private readonly getMediaByIdUseCase: GetMediaByIdUseCase) {}

  @mediaPrivateSwaggerDocumentation.getMediaById()
  @Get(":mediaId")
  async getMediaById(
    @Param("mediaId") mediaId: string,
    @Res() res: Response
  ): Promise<void> {
    const response = await this.getMediaByIdUseCase.execute(mediaId);

    res.setHeader(
      "Content-Type",
      response.headers["content-type"] || "application/octet-stream"
    );
    res.setHeader(
      "Content-Disposition",
      response.headers["content-disposition"] || "inline"
    );

    response.data.pipe(res);
  }
}
