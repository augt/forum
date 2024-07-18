import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsUUID()
  publication: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}
