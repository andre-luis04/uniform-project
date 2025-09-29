import { ConfigModule, ConfigService } from '@nestjs/config';
import axios from 'axios';

export const MEDIA_API_PROVIDER = {
  provide: 'MEDIA_API',
  useFactory: (configService: ConfigService) => {
    return axios.create({
      baseURL: configService.get<string>('MEDIA_BASE_URL'),
      headers: {
        'x-api-key': configService.get<string>('MEDIA_KEY'),
      },
    });
  },
  imports: [ConfigModule],
  inject: [ConfigService],
};
