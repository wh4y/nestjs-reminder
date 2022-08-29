import { AuthController } from "./auth.controller";
import { AuthService } from "../../../domain/services/auth/auth.service";
import { Test, TestingModule } from "@nestjs/testing";
import { LoginDto } from "../../dto/login.dto";
import User from "../../../domain/entities/user/user.entity";
import Email from "../../../domain/entities/user/valueObjects/email.value-object";
import Username from "../../../domain/entities/user/valueObjects/username.value-object";
import { CreateUserDto } from "../../dto/create-user.dto";


describe("AuthController", () => {
  let authController: AuthController;

  const mockAuthService = {
    login: jest.fn(async (dto: LoginDto) => {
      const user = User.createInstance({
        email: new Email(dto.email),
        username: new Username("test"),
        password: dto.password,
        contacts: [],
        events: [],
        accessToken: null,
        refreshToken: null
      });

      return user;
    }),
    register: jest.fn(async (dto: CreateUserDto) => {
      const user = User.createInstance({
        email: new Email(dto.email),
        username: new Username(dto.username),
        password: dto.password,
        contacts: [],
        events: [],
        accessToken: null,
        refreshToken: null
      });

      return user;
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(authController).toBeDefined();
  });

  describe("login", () => {
    it("should return user", () => {
      const dto: LoginDto = {
        email: "test@test.com",
        password: "Test-001"
      };

      const user = User.createInstance({
        email: new Email("test@test.com"),
        username: new Username("test"),
        password: "Test-001",
        contacts: [],
        events: [],
        accessToken: null,
        refreshToken: null
      });

      expect(authController.login(dto)).toEqual(Promise.resolve(user));
    });
  });

  it("should return user", () => {
    const dto: CreateUserDto = {
      username: "test",
      email: "test@test.com",
      password: "Test-001"
    };

    const user = User.createInstance({
      email: new Email("test@test.com"),
      username: new Username("test"),
      password: "Test-001",
      contacts: [],
      events: [],
      accessToken: null,
      refreshToken: null
    });

    expect(authController.register(dto)).toEqual(Promise.resolve(user));
  });
});
