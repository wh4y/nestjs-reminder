import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api/v1");

  const PORT = app.get<ConfigService>(ConfigService).get<number>("APP_PORT");

  await app.listen(PORT);
}

bootstrap();
