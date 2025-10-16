import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParse from "cookie-parser";
import { AllExceptionsFilter } from "./shared/error.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParse());

  const allowedOrigins = [
    "http://192.168.155.72:5173",
    "http://192.168.155.72:3000",
  ];

  app.enableCors({ origin: allowedOrigins, credentials: true });

  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle("project-uniform")
    .setDescription("")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  await app.listen(3000, () => {
    console.log(`servidor executado`);
  });
}
bootstrap();
