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

  @OneToMany(() => Publication, (publication) => publication.user)
  publications: Publication[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
