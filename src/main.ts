import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParse from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParse());

  app.enableCors({
    origin: "http://localhost:3006",
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("project-uniform")
    .setDescription("")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  await app.listen(3006, () => {
    console.log(`servidor executado`);
  });
}
bootstrap();
