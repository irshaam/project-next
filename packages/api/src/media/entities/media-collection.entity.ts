import { Tag } from 'src/tags/entities/tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

import { Media } from './media.entity';
@Entity()
export class MediaCollection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  name_en: string;

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

  @OneToMany(() => Media, (media) => media.collection)
  media: Media[];

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'media_collection_tags',
    joinColumn: {
      name: 'collection_id',
    },
  })
  tags: Tag[];

  @Column({ type: 'boolean', default: 1 })
  isActive: boolean;

  @Column({ type: 'boolean', default: 0 })
  isFeatured: boolean;
}
