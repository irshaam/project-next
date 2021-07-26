import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  Tree,
  ManyToOne,
  OneToMany,
  TreeParent,
  TreeChildren,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Index,
} from 'typeorm';

import { Post } from '../../posts/entities/post.entity';
import { TagType } from '../../tag-types/entities/tag-type.entity';

@Entity()
@Tree('adjacency-list')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  name: string;

  @Index()
  @Column({ unique: true })
  name_en: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  description_en?: string;

  @Column({ nullable: true })
  parentId: number;

  @Column()
  typeId: number;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  icon?: string;

  @Column({ nullable: true })
  primary_color?: string;

  @Column({ nullable: true })
  secondry_color?: string;

  @Column({ nullable: true })
  layout?: string;

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

  @CreateDateColumn()
  createdOn?: Date;
  @Column()
  createdBy?: number;

  @UpdateDateColumn()
  updatedOn?: Date;

  @Column({ nullable: true })
  updatedBy?: number;

  // Relationships
  @ManyToOne(() => TagType, (tagType) => tagType.tags)
  @JoinColumn({ name: 'type_id' })
  type: TagType;

  @ManyToOne((type: any) => Tag, (tag) => tag.children)
  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parent: Tag;

  @OneToMany((type: any) => Tag, (tag) => tag.parent)
  @TreeChildren()
  children: Tag[];

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];

  @BeforeInsert()
  async setCreatedUser(): Promise<void> {
    this.createdBy = 1;
  }

  @BeforeUpdate()
  async setUpdatedUser(): Promise<void> {
    this.updatedBy = 2;
  }
}
