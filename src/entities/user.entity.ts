import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  loginId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
