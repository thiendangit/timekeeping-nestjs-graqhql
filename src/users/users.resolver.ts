import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';

import { User } from './models/user';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUser(@CurrentUser() user: User): Promise<User | undefined> {
    return user;
    // return await this.usersService.findOne(getUserArgs);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  async getUsers(@Args() getUsersArgs: GetUsersArgs): Promise<User[] | []> {
    return await this.usersService.findAll(getUsersArgs);
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User | undefined> {
    return await this.usersService.createUser(createUserData);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): Promise<User | undefined> {
    return await this.usersService.updateUser(updateUserData);
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('deleteUserData') deleteUserData: DeleteUserInput,
  ): Promise<User | undefined> {
    return await this.usersService.removeOne(deleteUserData);
  }
}
