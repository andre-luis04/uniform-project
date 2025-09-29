import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MediaPrivateController } from './controllers/media-private.controller';
import { MEDIA_API_PROVIDER } from './providers/media-api.provider';
import { GetMediaByIdUseCase } from './use-cases/get-media-by-id.use-case';
import { GetMediasDataUseCase } from './use-cases/get-medias-data.use-case';
import { RemoveMediasUseCase } from './use-cases/remove-medias.use-case';
import { UploadMediasUseCase } from './use-cases/upload-medias.use-case';

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [MediaPrivateController],
  providers: [
    MEDIA_API_PROVIDER,
    UploadMediasUseCase,
    GetMediasDataUseCase,
    RemoveMediasUseCase,
    GetMediaByIdUseCase,
  ],
  exports: [
    'MEDIA_API',
    UploadMediasUseCase,
    GetMediasDataUseCase,
    RemoveMediasUseCase,
    GetMediaByIdUseCase,
  ],
})
export class MediaApiModule {}
