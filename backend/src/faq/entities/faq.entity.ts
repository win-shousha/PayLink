import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export enum FaqCategory {
  ACCOUNT = 'account',
  PAYMENTS = 'payments',
  ORDERS = 'orders',
  PRODUCTS = 'products',
  SUPPORT = 'support',
  SECURITY = 'security',
  GENERAL = 'general',
}

@Entity('faqs')
@Index(['category'])
@Index(['isActive'])
export class Faq {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @Column({ type: 'enum', enum: FaqCategory })
  category: FaqCategory;

  @Column({ type: 'simple-array', nullable: true })
  keywords: string[];

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  helpfulCount: number;

  @Column({ default: 0 })
  unhelpfulCount: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
