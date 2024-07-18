import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePublicationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;

  @IsString()
  @IsOptional()
  image: string;
}
