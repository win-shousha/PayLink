import { Controller, Get, Post, Body, Param, Put, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { OrdersService } from '../orders/orders.service';
import { UsersService } from '../users/users.service';
import { PaymentsService } from '../payments/payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(
    private adminService: AdminService,
    private ordersService: OrdersService,
    private usersService: UsersService,
    private paymentsService: PaymentsService,
  ) {}

  // Dashboard
  @Get('dashboard')
  async getDashboard() {
    const orders = await this.ordersService.getStats();
    const payments = await this.paymentsService.getPaymentStats();
    const settings = await this.adminService.getAllSettings();

    return {
      orders,
      payments,
      settings,
      timestamp: new Date(),
    };
  }

  // Logs
  @Get('logs')
  async getLogs(@Query('page') page: number = 1) {
    return this.adminService.getLogs(page);
  }

  // Settings
  @Get('settings')
  async getSettings() {
    return this.adminService.getAllSettings();
  }

  @Get('settings/:key')
  async getSetting(@Param('key') key: string) {
    return this.adminService.getSetting(key);
  }

  @Put('settings/:key')
  async updateSetting(@Param('key') key: string, @Body() body: { value: string }) {
    return this.adminService.updateSetting(key, body.value);
  }

  // Users Management
  @Get('users')
  async getUsers(@Query('page') page: number = 1) {
    return this.usersService.findAll(page);
  }

  // Orders Management
  @Get('orders')
  async getOrders(@Query('page') page: number = 1) {
    return this.ordersService.getStats();
  }

  // Payments Management
  @Get('payments')
  async getPayments(@Query('page') page: number = 1) {
    return this.paymentsService.getPaymentStats();
  }
}
