import User, { CreateUserOptions } from "../entities/user/user.entity";
import Email from "../entities/user/valueObjects/email.value-object";
import { CreateUserDto } from "../../application/dto/create-user.dto";

export interface IUsersService {
  getAllUsers(): Promise<User[]>;

  getUserById(id: string): Promise<User | null>;

  getUserByEmail(email: Email): Promise<User | null>;

  createUser(options: CreateUserOptions): Promise<User>;

  updateUser(updatedUser: User): Promise<User>;

  deleteUserById(id: string): Promise<User>;

  deleteUserByEmail(email: Email): Promise<User>;
}
