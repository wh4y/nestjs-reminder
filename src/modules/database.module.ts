import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { EntitySchema, MixedList } from "typeorm";
import { ConfigService } from "@nestjs/config";


@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async (configService: ConfigService) => {
            return {
              type: configService.get<string>("DB_DIALECT"),
              host: configService.get<string>("DB_HOST"),
              port: configService.get<string>("DB_PORT"),
              username: configService.get<string>("DB_USER"),
              password: configService.get<string>("DB_PASSWORD"),
              database: configService.get<string>("DB_NAME"),
              entities: ["./../entities/.entity{.ts,.js}"],
              migrations: ["./../typeorm/migrations/*{.ts,.js}"],
              synchronize: true,
              logging: true
            } as TypeOrmModuleAsyncOptions;
          },
          inject: [ConfigService]
        })
      ],
      exports: [TypeOrmModule]
    };
  }
}
