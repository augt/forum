import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Like } from 'src/likes/entities/like.entity';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  text: string;

  @Column({
    type: 'varchar',
  })
  image: string;

  @ManyToOne(() => User, (user) => user.publications)
  user: User;

  @OneToMany(() => Like, (like) => like.publication, {
    onDelete: 'CASCADE',
  })
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.publication, {
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
