import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import * as Joi from "Joi";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./modules/database.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_DIALECT: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required()
      })
    }),
    DatabaseModule.register()
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
