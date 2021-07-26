import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

import { PostRevision } from './post-revision.entity';

@Entity('post_reviews')
export class PostReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  feedback?: string;

  @Column({ type: 'text', nullable: true })
  changes?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToOne(() => PostRevision, { nullable: false })
  @JoinColumn({ name: 'revision_id' })
  revision: PostRevision;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'editor_id' })
  editor: User;
}
