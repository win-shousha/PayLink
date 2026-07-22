import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

export enum ProductCategory {
  STREAMING = 'streaming',
  AI = 'ai',
  CREATIVE = 'creative',
  PRODUCTIVITY = 'productivity',
  GAMES_PC = 'games_pc',
  GAMES_MOBILE = 'games_mobile',
  GIFT_CARDS = 'gift_cards',
  PREMIUM_APPS = 'premium_apps',
  SHOPPING = 'shopping',
}

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  OUT_OF_STOCK = 'out_of_stock',
  COMING_SOON = 'coming_soon',
}

@Entity('products')
@Index(['category'])
@Index(['status'])
@Index(['name'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: ProductCategory })
  category: ProductCategory;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @Column({ default: true })
  featured: boolean;

  @Column({ default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviewCount: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
