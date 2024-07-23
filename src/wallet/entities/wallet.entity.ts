import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  wallet_id: string;

  @Column({ nullable: false })
  user_id: string;

  @Column({ default: 0, nullable: false })
  amount_before: number;

  @Column({ default: 0, nullable: false })
  amount_after: number;

  @CreateDateColumn({ nullable: false, select: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false, select: false })
  updatedAt: Date;
}
