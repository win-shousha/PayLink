import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Index } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum TicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity('support_tickets')
@Index(['user'])
@Index(['status'])
@Index(['createdAt'])
export class SupportTicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @Column()
  subject: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.OPEN })
  status: TicketStatus;

  @Column({ type: 'enum', enum: TicketPriority, default: TicketPriority.MEDIUM })
  priority: TicketPriority;

  @Column({ nullable: true })
  assignedTo: string;

  @Column({ type: 'jsonb', nullable: true })
  attachments: Record<string, any>[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
