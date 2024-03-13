import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserResponseType } from './types/UserResponseType';
import { ExpressRequest } from 'src/middlewares/auth.middleware';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseType> {
    console.log(createUserDto);
    const createdUser = await this.usersService.create(createUserDto);
    return {
      username: createdUser.username,
      name: createdUser.name,
      email: createdUser.email,
    };
  }

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }
  // users/:id
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserResponseType> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    const findUser = await this.usersService.findById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }

  // users/:id
  @Patch(':id')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UserResponseType> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const updatedUser = await this.usersService.update(id, updateUserDto);
    if (!updatedUser) throw new HttpException('User not found', 404);
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserResponseType> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    const deletedUser = await this.usersService.remove(id);
    if (!deletedUser) throw new HttpException('User not found', 404);
    return deletedUser;
  }

  @Get('user')
  async currentUser(
    @Request() request: ExpressRequest,
  ): Promise<UserResponseType> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return request.user;
  }
}
