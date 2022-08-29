import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from "@nestjs/common";
import { IAuthController } from "./auth-controller.interface";
import { LoginDto } from "../../dto/login.dto";
import User from "../../../domain/entities/user/user.entity";
import { CreateUserDto } from "../../dto/create-user.dto";
import { AuthService } from "../../../domain/services/auth/auth.service";

@Controller("/auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController implements IAuthController {
  constructor(
    private readonly authService: AuthService
  ) {
  }

  @Post("/login")
  async login(@Body() dto: LoginDto): Promise<User> {
    const user = await this.authService.login(dto);
    return user;
  }

  @Post("/register")
  async register(@Body() dto: CreateUserDto): Promise<User> {
    const user = await this.authService.register(dto);
    return user;
  }
}
