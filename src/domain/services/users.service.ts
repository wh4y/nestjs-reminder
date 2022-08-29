import { Injectable } from "@nestjs/common";
import { IUsersService } from "./users-service.interface";
import User, { CreateUserOptions } from "../entities/user/user.entity";
import Email from "../entities/user/valueObjects/email.value-object";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "../../infrastructure/repositories/users.repository";


@Injectable()
export class UsersService implements IUsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: UsersRepository
  ) {
  }

  async createUser(options: CreateUserOptions): Promise<User> {
    const existingUser: User = await this.getUserByEmail(options.email);
    if (existingUser) throw new Error("User already exists!");

    let user: User = User.createInstance(options);

    user = await this.usersRepository.save(user);
    return user;
  }

  async deleteUserByEmail(email: Email): Promise<User> {
    const user: User = await this.getUserByEmail(email);
    if (!user) throw new Error("There's no user with this email!");

    await this.usersRepository.delete({ email });

    return user;
  }

  async deleteUserById(id: string): Promise<User> {
    const user: User = await this.getUserById(id);
    if (!user) throw new Error("There's no user with this id!");

    await this.usersRepository.delete({ id });

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users: User[] = await this.usersRepository.find({
      relations: {
        contacts: true,
        events: true
      }
    });
    return users;
  }

  async getUserByEmail(email: Email): Promise<User | null> {
    const user: User = await this.usersRepository.findOne({
      where: {
        email
      },
      relations: {
        contacts: true,
        events: true
      }
    });

    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    const user: User = await this.usersRepository.findOne({
      where: {
        id
      },
      relations: {
        contacts: true,
        events: true
      }
    });

    return user;
  }

  async updateUser(updatedUser: User): Promise<User> {
    const existingUser: User = await this.getUserByEmail(updatedUser.email);
    if (!existingUser) throw new Error("Such a user doesn't exists!");

    const user: User = await this.usersRepository.save(updatedUser);
    return user;
  }

}
