import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/role.enum';
const saltRounds = 10;

export type UserGenderType = 'male' | 'female';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { comment: 'unique identifier' })
  user_id: string;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  other_names: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: ['male', 'female'],
  })
  gender: UserGenderType;

  @Column({ nullable: false, unique: true })
  address: string;

  @Column({ nullable: false, unique: true })
  phone: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @CreateDateColumn({ nullable: false, select: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false, select: false })
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const Salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(password || this.password, Salt);
  }
}
