import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { ConfigService } from "@nestjs/config";

config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: configService.get<string>("DB_DIALECT"),
  host: configService.get<string>("DB_HOST"),
  port: configService.get<string>("PORT"),
  username: configService.get<string>("DB_USER"),
  password: configService.get<string>("DB_PASSWORD"),
  database: configService.get<string>("DB_NAME"),
  synchronize: true,
  logging: true,
  entities: ["./dist/entities/*.entity{.ts,.js}"],
  migrations: ["./dist/typeorm/migrations/*{.ts,.js}"],
  cli: {
    migrationsDir: "./dist/typeorm/migrations"
  }
} as DataSourceOptions);
