import { Module } from "@nestjs/common";
import { UsersService } from "../../domain/services/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "../../domain/entities/user/user.entity";

@Module({
  imports:[TypeOrmModule.forFeature([User]),],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {
}
