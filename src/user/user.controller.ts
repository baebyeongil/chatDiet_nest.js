import { Body, Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
interface RequestWithLocals extends Request {
  locals: {
    id: number;
    name: string;
  };
}

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Post('/signup')
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(
      data.loginId,
      data.name,
      data.password,
    );
  }

  @Post('/login')
  async login(
    @Body() data: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user } = await this.userService.login(
      data.loginId,
      data.password,
    );
    res.cookie('Authorization', 'Bearer ' + accessToken);
    return {
      message: 'login successfully ',
      token: accessToken,
      id: user.id,
    };
  }

  @Put('/user/update')
  async updateUser(@Req() req: RequestWithLocals, @Body() data: UpdateUserDto) {
    const id = req.locals.id;
    return await this.userService.updateUser(id, data.name, data.password);
  }
}
