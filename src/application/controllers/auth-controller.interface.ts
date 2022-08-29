import { CreateUserDto } from "../dto/create-user.dto";
import { LoginDto } from "../dto/login.dto";
import User from "../../domain/entities/user/user.entity";

export interface IAuthController {
  register(dto: CreateUserDto): Promise<User>;

  login(dto: LoginDto): Promise<User>;
}
