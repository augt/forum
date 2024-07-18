import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string) {
    try {
      return await this.usersRepository.findOneBy({ email });
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (user) delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.create(createUserDto);

      await hash(newUser.password, 10).then((hash) => {
        newUser.password = hash;
      });

      await this.usersRepository.save(newUser);

      delete newUser.password;
      return newUser;
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }

  async updateUser(updateUserDto: UpdateUserDto, req) {
    try {
      const user = await this.findOneById(req.user.id);
      if (updateUserDto.password) {
        await hash(updateUserDto.password, 10).then((hash) => {
          updateUserDto.password = hash;
        });
      }

      const updatedUser = { ...user, ...updateUserDto };
      const savedUser = await this.usersRepository.save(updatedUser);
      delete savedUser.password;
      return savedUser;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.findOneById(id);
      return await this.usersRepository.remove(user);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
