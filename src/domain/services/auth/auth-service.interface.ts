import User from "../../entities/user/user.entity";
import { CreateUserDto } from "../../../application/dto/create-user.dto";
import { LoginDto } from "src/application/dto/login.dto";

export interface IAuthService {
  register(options: CreateUserDto): Promise<User>;

  login(options: LoginDto): Promise<User>;
}
