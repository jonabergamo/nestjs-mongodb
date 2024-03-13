/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserResponseType } from 'src/users/types/UserResponseType';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ token: string; refreshToken: string }> {
    const user = await this.authService.loginUser(loginDto);
    const jwt = await this.authService.generateJwt(user);
    return {
      refreshToken: user.refreshToken,
      token: jwt,
    };
  }
}
