import { Publication } from 'src/publications/entities/publication.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Like } from 'src/likes/entities/like.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  username: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @OneToMany(() => Publication, (publication) => publication.user, {
    onDelete: 'CASCADE',
  })
  publications: Publication[];

  @OneToMany(() => Comment, (comment) => comment.user, {
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user, {
    onDelete: 'CASCADE',
  })
  likes: Like[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
