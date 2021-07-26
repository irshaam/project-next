import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { nanoid } from '../../shared/utils';
import { Tag } from '../../tags/entities/tag.entity';
import { User } from '../../users/entities/user.entity';

import { PostRevision } from './post-revision.entity';

export enum PostStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  REJECTED = 'rejected',
  APPROVED = 'approved',
  SCHEDULED = 'scheduled',
  PUBLISHED = 'published',
  UN_PUBLISHED = 'unpublished',
  ARCHIEVED = 'archived',
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: false, unique: true })
  nanoid: string;

  @ManyToOne(() => Tag, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category: Tag;

  @Column()
  categoryId: number;

  @Column({ nullable: true })
  topicId: number;

  @ManyToOne(() => Tag, { nullable: true })
  @JoinColumn({ name: 'topic_id' })
  topic: Tag;

  @Column({ nullable: true, unique: true })
  slug: string;

  @Column({ nullable: true })
  featured_image: string;

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

  @Column({ nullable: false, default: 'dv' })
  locale: string;

  @Column({ nullable: false, default: 'base' })
  layout: string;

  @Column({ type: 'enum', default: 'draft', enum: PostStatus })
  status: PostStatus;

  @Column({ default: 0 })
  current_version: number;

  @Column({ type: 'boolean', default: 1 })
  isLocked: boolean;

  @Column({ type: 'boolean', default: 1 })
  showAuthors: boolean;

  @Column({ nullable: true, default: 0 })
  isFeatured: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;

  @Column({ name: 'scheduled_at', type: 'timestamp', nullable: true })
  scheduledAt: Date;

  @Column({ name: 'edited_at', type: 'timestamp', nullable: true })
  editedAt: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'edited_by' })
  editedBy: User;

  @Column({ type: 'boolean', default: 0 })
  isPublished: boolean;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'published_by' })
  publishedBy: User;

  // Relationships
  @ManyToMany(() => Tag, {})
  @JoinTable({ name: 'post_tags' })
  tags: Tag[];

  @ManyToMany(() => User, {})
  @JoinTable({ name: 'post_authors' })
  authors: User[];

  @OneToMany(() => PostRevision, (revision) => revision.post, {
    eager: true,
  })
  versions: PostRevision[];

  @BeforeInsert()
  async setNanoid() {
    this.nanoid = await nanoid();
  }

  @BeforeInsert()
  async setStatus() {
    this.status = PostStatus.DRAFT;
  }
}
