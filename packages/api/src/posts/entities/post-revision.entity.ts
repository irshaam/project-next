import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Post } from '../entities/post.entity';

@Entity('post_revisions')
export class PostRevision {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  heading: string;

  @Column({ nullable: true })
  heading_detailed: string;

  @Column({ nullable: true, unique: true })
  latin_heading: string;

  @Column({ nullable: true })
  lead_text: string;

  @Column({ nullable: true })
  hightlights: string;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  content_html: string;

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @Column({ type: 'text', nullable: true })
  changes: string;

  @Column({ default: 0 })
  current_version: number;

  @CreateDateColumn()
  createdAt?: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;

  @ManyToOne(() => Post, (post) => post.versions)
  post: Post;
}
