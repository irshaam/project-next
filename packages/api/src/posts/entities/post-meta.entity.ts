import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Post } from './post.entity';

@Entity()
export class PostMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column({ nullable: true })
  og_image?: string;

  @Column({ nullable: true, length: 300 })
  og_title?: string;

  @Column({ nullable: true, length: 500 })
  og_description?: string;

  @Column({ nullable: true })
  twitter_image?: string;

  @Column({ nullable: true, length: 300 })
  twitter_title?: string;

  @Column({ nullable: true, length: 500 })
  twitter_description?: string;

  @Column({ nullable: true, length: 300 })
  meta_title?: string;

  @Column({ nullable: true, length: 500 })
  meta_description?: string;
}
