import { DynamicModule, Module } from "@nestjs/common";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({})
export class JwtModule {
  static async registerAsync(): Promise<DynamicModule> {
    return {
      module: JwtModule,
      imports: [
        NestJwtModule.registerAsync({
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>("JWT_SECRET")
          }),
          inject: [ConfigService]
        })
      ],
      exports: [NestJwtModule]
    };
  }
}
