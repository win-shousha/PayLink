import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Index } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentProvider {
  STRIPE = 'stripe',
  FLUTTERWAVE = 'flutterwave',
  PAYSTACK = 'paystack',
  MOBILE_MONEY = 'mobile_money',
  CASH = 'cash',
}

@Entity('payments')
@Index(['order'])
@Index(['user'])
@Index(['status'])
@Index(['createdAt'])
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, { eager: true })
  order: Order;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Column({ type: 'enum', enum: PaymentProvider })
  provider: PaymentProvider;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  currency: string;

  @Column({ nullable: true })
  reference: string;

  @Column({ nullable: true })
  transactionId: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ nullable: true })
  errorMessage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
