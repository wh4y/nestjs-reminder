import { Module } from "@nestjs/common";
import { UsersModule } from "./users.module";
import { JwtModule } from "./jwt.module";
import { AuthService } from "../../domain/services/auth/auth.service";
import { AuthController } from "../controllers/auth/auth.controller";

@Module({
  imports: [
    JwtModule.registerAsync(),
    UsersModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [
    UsersModule,
    AuthService
  ]
})
export class AuthModule {
}
