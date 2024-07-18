import { PartialType } from '@nestjs/mapped-types';
import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsAlphanumeric()
  @IsOptional()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsAlpha()
  @IsOptional()
  password: string;
}
