// media-private.swagger.ts
import { applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const mediaPrivateSwaggerDocumentation = {
  getMediaById: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Obtém mídia por ID (stream)',
        description:
          'Faz proxy da mídia e retorna o arquivo como stream. `Content-Type` e `Content-Disposition` são propagados do serviço de mídia.',
      }),
      ApiParam({
        name: 'mediaId',
        type: 'string',
        description: 'Critério',
        example: '123456789012345678',
      }),
      ApiProduces(
        'application/octet-stream',
        'image/jpeg',
        'image/png',
        'video/mp4',
        'application/pdf',
      ),
      ApiOkResponse({
        description: '**Ok** (stream binário)',
        headers: {
          'content-type': {
            description: 'MIME type do arquivo retornado.',
            schema: { type: 'string' },
          },
          'content-disposition': {
            description:
              'Como o arquivo deve ser exibido (`inline` ou `attachment; filename="..."`).',
            schema: { type: 'string' },
          },
        },
        schema: {
          type: 'string',
          format: 'binary',
        },
      }),
      // Como o guard exige autenticação por sessão, 401/403 fazem sentido aqui:
      ApiUnauthorizedResponse({ description: 'Token ausente ou inválido.' }),
      ApiForbiddenResponse({ description: 'Acesso negado.' }),
      // O serviço upstream pode responder 404/500; mapeamos genericamente:
      ApiNotFoundResponse({ description: 'Mídia não encontrada.' }),
      ApiInternalServerErrorResponse({ description: 'Erro interno.' }),
    ),
};
