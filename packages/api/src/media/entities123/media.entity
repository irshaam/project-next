import { Tag } from 'src/tags/entities/tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

import { MediaCollection } from './media-collection.entity';
@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file: string;

  @Column()
  original_filename: string;

  @Column()
  path: string;

  @Column({ nullable: true })
  contentSize: string;

  @Column({ nullable: true })
  mimeType: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  caption: string;

  @Column({ nullable: true })
  captionEn: string;

  @Column({ type: 'boolean', default: 0 })
  hasWatermark: boolean;

  @Column({ type: 'boolean', default: 1 })
  isActive: boolean;

  @Column({ type: 'boolean', default: 0 })
  isFeatured: boolean;

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

  @ManyToOne(() => MediaCollection, (collection) => collection.media, {
    nullable: true,
  })
  @JoinColumn({ name: 'collection_id' })
  collection?: MediaCollection;

  @ManyToMany(() => Tag, {})
  @JoinTable({ name: 'media_tags' })
  tags: Tag[];
}
