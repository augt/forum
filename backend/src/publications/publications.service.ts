import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectRepository(Publication)
    private publicationsRepository: Repository<Publication>,
  ) {}

  async createPublication(req, createPublicationDto: CreatePublicationDto) {
    try {
      const newPublication = this.publicationsRepository.create({
        user: { id: req.user.id },
        title: createPublicationDto.title,
        text: createPublicationDto.text,
      });

      return await this.publicationsRepository.save(newPublication);
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }

  async findAllPublications() {
    return await this.publicationsRepository.find({
      order: {
        createdAt: 'DESC',
        comments: {
          createdAt: 'ASC',
        },
      },
      relations: {
        user: true,
        comments: {
          user: true,
        },
        likes: {
          user: true,
        },
      },
      select: {
        user: {
          id: true,
          username: true,
        },
        comments: {
          id: true,
          text: true,
          user: {
            id: true,
            username: true,
          },
          createdAt: true,
          updatedAt: true,
        },
        likes: {
          id: true,
          user: {
            id: true,
          },
        },
      },
    });
  }

  async findOneById(id: string) {
    try {
      const publication = await this.publicationsRepository.findOne({
        where: {
          id,
        },
        relations: {
          user: true,
          comments: {
            user: true,
          },
          likes: {
            user: true,
          },
        },
        select: {
          user: {
            id: true,
            username: true,
          },
          comments: {
            id: true,
            text: true,
            user: {
              id: true,
              username: true,
            },
            createdAt: true,
            updatedAt: true,
          },
          likes: {
            id: true,
            user: {
              id: true,
            },
          },
        },
        order: {
          comments: {
            createdAt: 'ASC',
          },
        },
      });
      if (!publication) throw new NotFoundException();
      return publication;
    } catch (error) {
      throw error;
    }
  }

  async updatePublication(
    req,
    id: string,
    updatePublicationDto: UpdatePublicationDto,
  ) {
    try {
      const publication = await this.findOneById(id);

      if (publication.user.id !== req.user.id) throw new ForbiddenException();

      const updatedPublication = { ...publication, ...updatePublicationDto };

      return await this.publicationsRepository.save(updatedPublication);
    } catch (error) {
      throw error;
    }
  }

  async removePublication(req, id: string) {
    try {
      const publication = await this.findOneById(id);
      if (req.user.id !== publication.user.id) throw new ForbiddenException();
      return await this.publicationsRepository.remove(publication);
    } catch (error) {
      throw error;
    }
  }
}
