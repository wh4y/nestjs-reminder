import { IAuthService } from "./auth-service.interface";
import User, { CreateUserOptions } from "../../entities/user/user.entity";
import JWT from "../../entities/user/valueObjects/jwt.value-object";
import { LoginDto } from "../../../application/dto/login.dto";
import { CreateUserDto } from "../../../application/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import Email from "../../entities/user/valueObjects/email.value-object";
import Username from "../../entities/user/valueObjects/username.value-object";
import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcrypt";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
  }

  private async generateToken(payload: LoginDto, expiresIn: string): Promise<JWT> {
    const token = await this.jwtService.signAsync(payload, { expiresIn });
    return new JWT(token);
  }

  private async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }

  private async validatePassword(hashedPassword: string, passwordToValidate: string): Promise<boolean> {
    return await compare(passwordToValidate, hashedPassword);
  }

  public async login(options: LoginDto): Promise<User> {
    const existingUser = await this.usersService.getUserByEmail(new Email(options.email));
    if (!existingUser) throw new Error("Such a user doesn't exists!");

    const isPasswordValid = await this.validatePassword(existingUser.password, options.password);
    if (!isPasswordValid) throw new Error("Data validation failed!");

    const accessToken = await this.generateToken(options, await this.configService.get<string>("JWT_ACCESS_EXPIRES_IN"));
    const refreshToken = await this.generateToken(options, await this.configService.get<string>("JWT_REFRESH_EXPIRES_IN"));

    const user = existingUser.withTokens({ accessToken, refreshToken });

    await this.usersService.updateUser(user);

    return user;
  }

  public async register(options: CreateUserDto): Promise<User> {
    const existingUser = await this.usersService.getUserByEmail(new Email(options.email));
    if (existingUser) throw new Error("User already exists!");

    const hashedPassword = await this.hashPassword(options.password);

    const createUserOptions: CreateUserOptions = {
      email: new Email(options.email),
      username: new Username(options.username),
      password: hashedPassword,
      contacts: [],
      events: [],
      accessToken: null,
      refreshToken: null
    };

    await this.usersService.createUser(createUserOptions);

    const loginOptions = { ...options };
    Reflect.deleteProperty(loginOptions, "username");

    return await this.login(loginOptions as LoginDto);
  }

}
