import { Controller, Post, Get, Body, Param, Put, Query, UseGuards, Request } from '@nestjs/common';
import { SupportService } from './support.service';
import { CreateTicketDto, UpdateTicketDto } from './dtos/support.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('support')
export class SupportController {
  constructor(private supportService: SupportService) {}

  @Post('tickets')
  @UseGuards(JwtAuthGuard)
  async createTicket(@Request() req, @Body() createTicketDto: CreateTicketDto) {
    return this.supportService.createTicket(req.user.id, createTicketDto);
  }

  @Get('tickets/:id')
  @UseGuards(JwtAuthGuard)
  async getTicket(@Param('id') id: string) {
    return this.supportService.getTicket(id);
  }

  @Get('tickets')
  @UseGuards(JwtAuthGuard)
  async getUserTickets(@Request() req, @Query('page') page: number = 1) {
    return this.supportService.getUserTickets(req.user.id, page);
  }

  @Put('tickets/:id')
  @UseGuards(JwtAuthGuard)
  async updateTicket(@Param('id') id: string, @Body() updateDto: UpdateTicketDto) {
    return this.supportService.updateTicket(id, updateDto);
  }
}
