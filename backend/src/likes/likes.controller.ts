import {
  Controller,
  Post,
  Body,
  Request,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createLikeDto: CreateLikeDto) {
    return this.likesService.createLike(req, createLikeDto);
  }

  /* @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesService.findOne(+id);
  } 

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(+id, updateLikeDto);
  }*/
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeLike(@Request() req, @Param('id') id: string) {
    return this.likesService.removeLike(req, id);
  }
}
