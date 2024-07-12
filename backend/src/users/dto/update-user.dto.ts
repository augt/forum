import { PartialType } from '@nestjs/mapped-types';
import { IsAlpha, IsAlphanumeric, IsEmail, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsAlphanumeric()
  username?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsAlpha()
  password?: string;
}
