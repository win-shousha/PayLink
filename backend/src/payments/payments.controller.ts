import { Controller, Post, Get, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { InitiatePaymentDto, ConfirmPaymentDto } from './dtos/payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('initiate')
  @UseGuards(JwtAuthGuard)
  async initiatePayment(@Request() req, @Body() initiateDto: InitiatePaymentDto) {
    return this.paymentsService.initiatePayment(req.user.id, initiateDto);
  }

  @Post('confirm')
  async confirmPayment(@Body() confirmDto: ConfirmPaymentDto) {
    return this.paymentsService.confirmPayment(confirmDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getPayment(@Param('id') id: string) {
    return this.paymentsService.findById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserPayments(@Request() req, @Query('page') page: number = 1) {
    return this.paymentsService.getUserPayments(req.user.id, page);
  }
}
