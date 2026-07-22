import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum SettingKey {
  COMMISSION_RATE = 'commission_rate',
  FEE_RATE = 'fee_rate',
  MIN_WITHDRAWAL = 'min_withdrawal',
  MAX_WITHDRAWAL = 'max_withdrawal',
  MAINTENANCE_MODE = 'maintenance_mode',
  CURRENCY = 'currency',
  SUPPORT_EMAIL = 'support_email',
  PHONE = 'phone',
}

@Entity('settings')
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  key: string;

  @Column({ type: 'text' })
  value: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
