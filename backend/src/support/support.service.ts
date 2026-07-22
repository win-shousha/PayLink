import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportTicket, TicketStatus } from './entities/support-ticket.entity';
import { CreateTicketDto, UpdateTicketDto } from './dtos/support.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(SupportTicket)
    private ticketsRepository: Repository<SupportTicket>,
    private usersService: UsersService,
  ) {}

  async createTicket(userId: string, createTicketDto: CreateTicketDto): Promise<SupportTicket> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const ticket = this.ticketsRepository.create({
      user,
      ...createTicketDto,
      status: TicketStatus.OPEN,
    });

    return this.ticketsRepository.save(ticket);
  }

  async getTicket(id: string): Promise<SupportTicket> {
    const ticket = await this.ticketsRepository.findOne({ where: { id } });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket;
  }

  async getUserTickets(userId: string, page: number = 1, limit: number = 20) {
    const [tickets, total] = await this.ticketsRepository.findAndCount({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { tickets, total, page };
  }

  async updateTicket(id: string, updateDto: UpdateTicketDto): Promise<SupportTicket> {
    await this.ticketsRepository.update(id, updateDto);
    return this.getTicket(id);
  }

  async getAllTickets(status?: TicketStatus, page: number = 1, limit: number = 20) {
    const query = this.ticketsRepository.createQueryBuilder('ticket');

    if (status) {
      query.where('ticket.status = :status', { status });
    }

    const [tickets, total] = await query
      .orderBy('ticket.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { tickets, total, page };
  }
}
