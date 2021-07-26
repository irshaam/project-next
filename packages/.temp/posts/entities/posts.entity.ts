import {
  UpdateDateColumn,
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('posts')
export class PostsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  heading: string;

  @Column({ type: 'varchar', nullable: true })
  short_heading: string;

  @Column({ type: 'varchar', nullable: true })
  latin_heading: string;

  @Column({ type: 'varchar', nullable: true })
  slug: string;

  @Column({ type: 'json', nullable: true })
  summary: string;

  @Column({ type: 'text', nullable: true })
  summary_html: string;

  @Column({ type: 'json', nullable: true })
  content: string;

  @Column({ type: 'text', nullable: true })
  content_html: string;

  @Column({ type: 'json', nullable: true })
  feature_image: string;

  @Column({ type: 'json', nullable: true })
  og_image: string;

  @Column({ type: 'json', nullable: true })
  twitter_image: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt: Date;

  @Column({ name: 'scheduled_at', type: 'timestamp', nullable: true })
  scheduledAt: Date;
}
