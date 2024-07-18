import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  UseGuards,
  Request,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    const newUser = await this.usersService.createUser(body);
    return newUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Request() req) {
    const user = await this.usersService.findOneById(req.user.id);
    if (!user) throw new UnauthorizedException();
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    return await this.usersService.updateUser(updateUserDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Request() req) {
    await this.usersService.deleteUser(req.user.id);
    return { msg: 'user deleted' };
  }
}
