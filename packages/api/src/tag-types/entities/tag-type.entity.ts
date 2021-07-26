import {
  UpdateDateColumn,
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Tag } from '../../tags/entities/tag.entity';

@Entity('tag_types')
export class TagType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true, nullable: true })
  slug?: string;

  @Column({ default: 'default' })
  layout?: string;

  @Column('json', { nullable: true })
  meta?: string;

  @CreateDateColumn()
  createdOn?: Date;

  @UpdateDateColumn()
  updatedOn?: Date;

  @OneToMany(() => Tag, (tag) => tag.type)
  tags: Tag[];
}
