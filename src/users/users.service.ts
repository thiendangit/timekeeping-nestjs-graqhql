import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './models/user';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      userId: '0',
      email: 'admin@gmail.com',
      password: '123123',
    },
  ];

  public async createUser(createUserData: CreateUserInput): Promise<User | undefined> {
    const user: User = {
      userId: uuidv4(),
      ...createUserData,
    };

    this.users.push(user);

    return user;
  }

  public async updateUser(updateUserData: UpdateUserInput): Promise<User | undefined> {
    const user = this.users.find((user) => user.userId === updateUserData.userId);

    Object.assign(user, updateUserData);

    return user;
  }

  public async findOne(getUserArgs: GetUserArgs): Promise<User | undefined> {
    return this.users.find((user) => user.userId === getUserArgs.userId);
  }

  public async findAll(getUsersArgs: GetUsersArgs): Promise<User[] | []> {
    return (await getUsersArgs.userIds.map((userId) => this.findOne({ userId }))) as any;
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.users.find((user) => user.email === email);
  }

  public async removeOne(deleteUserData: DeleteUserInput): Promise<User | undefined> {
    const userIndex = this.users.findIndex((user) => user.userId === deleteUserData.userId);

    const user = this.users[userIndex];

    this.users.splice(userIndex);

    return user;
  }
}
