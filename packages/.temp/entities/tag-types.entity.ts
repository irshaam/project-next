import {
  UpdateDateColumn,
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TagTypesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  layout: string;

  @Column()
  meta: string;

  @CreateDateColumn({ name: 'created_at' })
  createdOn?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedOn?: Date;
}
