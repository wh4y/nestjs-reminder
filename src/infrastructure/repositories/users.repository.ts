import { Repository } from "typeorm";
import User from "../../domain/entities/user/user.entity";

export class UsersRepository extends Repository<User> {
}
