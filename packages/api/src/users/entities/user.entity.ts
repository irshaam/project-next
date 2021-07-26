import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { PostReview } from 'src/posts/entities/post-review.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { Role } from '../../roles/entities/role.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;
  // @Column({ length: 20, nullable: false, unique: true })
  // nanoid: string;

  // @Column()
  // @Generated('uuid')
  // uuid: string;
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  name_en: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  cover_picture: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  bio_en: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ type: 'boolean', default: 1 })
  isActive: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  @OneToMany(() => PostReview, (postReview) => postReview.editor)
  reviews: PostReview[];
}
