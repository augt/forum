import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}
  async createLike(req, createLikeDto: CreateLikeDto) {
    try {
      const newLike = this.likesRepository.create({
        user: { id: req.user.id },
        publication: { id: createLikeDto.publication },
      });

      await this.preventUserLikingTwicePublication(
        req.user.id,
        createLikeDto.publication,
      );

      return await this.likesRepository.save(newLike);
    } catch (error) {
      throw error;
    }
  }

  async preventUserLikingTwicePublication(
    userId: string,
    publicationId: string,
  ) {
    const formerLike = await this.likesRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        publication: { id: publicationId },
      },
    });
    if (formerLike) throw new ForbiddenException();
    return;
  }

  async findOneById(id: string) {
    try {
      const like = await this.likesRepository.findOne({
        where: {
          id,
        },
        relations: {
          user: true,
        },
        select: {
          user: {
            id: true,
          },
        },
      });
      if (!like) throw new NotFoundException();
      return like;
    } catch (error) {
      throw error;
    }
  }

  async removeLike(req, id: string) {
    try {
      const like = await this.findOneById(id);
      if (req.user.id !== like.user.id) throw new ForbiddenException();
      return await this.likesRepository.remove(like);
    } catch (error) {
      throw error;
    }
  }
}
