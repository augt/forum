import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async createComment(req, createCommentDto: CreateCommentDto) {
    try {
      const newComment = this.commentsRepository.create({
        user: req.user.id,
        publication: { id: createCommentDto.publication },
        text: createCommentDto.text,
      });
      return await this.commentsRepository.save(newComment);
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }

  async findOneById(id: string) {
    try {
      const comment = await this.commentsRepository.findOne({
        where: {
          id,
        },
        relations: {
          user: true,
          publication: true,
        },
        select: {
          user: {
            id: true,
          },
        },
      });
      if (!comment) throw new NotFoundException();
      return comment;
    } catch (error) {
      throw error;
    }
  }

  async updateComment(req, id: string, updateCommentDto: UpdateCommentDto) {
    try {
      const comment = await this.findOneById(id);

      if (comment.user.id !== req.user.id) throw new ForbiddenException();

      const updatedComment = {
        ...comment,
        ...updateCommentDto,
        publication: { id: comment.publication.id },
      };

      return await this.commentsRepository.save(updatedComment);
    } catch (error) {
      throw error;
    }
  }

  async removeComment(req, id: string) {
    try {
      const comment = await this.findOneById(id);
      if (req.user.id !== comment.user.id) throw new ForbiddenException();
      return await this.commentsRepository.remove(comment);
    } catch (error) {
      throw error;
    }
  }
}
