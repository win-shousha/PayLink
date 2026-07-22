import { IsNotEmpty, IsString, IsEnum, IsOptional, IsArray } from 'class-validator';
import { TicketStatus, TicketPriority } from '../entities/support-ticket.entity';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;

  @IsOptional()
  @IsArray()
  attachments?: Record<string, any>[];
}

export class UpdateTicketDto {
  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @IsOptional()
  @IsString()
  message?: string;
}
