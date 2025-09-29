import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MediaPathConfigService } from './media-path-config.service';
import mediaPathConfig from './media-path.config';

@Module({
  imports: [ConfigModule.forFeature(mediaPathConfig)],
  providers: [MediaPathConfigService],
  exports: [MediaPathConfigService],
})
export class MediaPathConfigModule {}
