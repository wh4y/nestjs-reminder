import { Module } from "@nestjs/common";
import { UsersModule } from "./users.module";
import { JwtModule } from "./jwt.module";
import { AuthService } from "../services/auth.service";

@Module({
  imports: [
    JwtModule.registerAsync(),
    UsersModule
  ],
  providers: [AuthService],
  exports: [
    UsersModule,
    AuthService
  ]
})
export class AuthModule {
}
