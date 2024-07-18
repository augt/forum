import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationDto } from './create-publication.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  text: string;

  @IsString()
  @IsOptional()
  image: string;
}
