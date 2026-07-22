import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus, PaymentProvider } from './entities/payment.entity';
import { CreatePaymentDto, InitiatePaymentDto, ConfirmPaymentDto } from './dtos/payment.dto';
import { OrdersService } from '../orders/orders.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    private ordersService: OrdersService,
    private usersService: UsersService,
  ) {}

  async create(userId: string, createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const order = await this.ordersService.findById(createPaymentDto.orderId);
    const user = await this.usersService.findById(userId);

    if (!order || !user) {
      throw new NotFoundException('Order or user not found');
    }

    const payment = this.paymentsRepository.create({
      order,
      user,
      amount: createPaymentDto.amount,
      provider: createPaymentDto.provider,
      reference: createPaymentDto.reference,
      currency: 'XOF',
      status: PaymentStatus.PENDING,
      metadata: createPaymentDto.metadata,
    });

    return this.paymentsRepository.save(payment);
  }

  async initiatePayment(userId: string, initiateDto: InitiatePaymentDto): Promise<any> {
    const payment = await this.create(userId, {
      orderId: initiateDto.orderId,
      amount: (await this.ordersService.findById(initiateDto.orderId)).totalAmount,
      provider: initiateDto.provider,
    });

    // Intégrations futures avec les providers
    switch (initiateDto.provider) {
      case PaymentProvider.STRIPE:
        return this.initiateStripePayment(payment);
      case PaymentProvider.FLUTTERWAVE:
        return this.initiateFlutterwavePayment(payment, initiateDto.phoneNumber);
      case PaymentProvider.PAYSTACK:
        return this.initiatePaystackPayment(payment);
      case PaymentProvider.MOBILE_MONEY:
        return this.initiateMobileMoneyPayment(payment, initiateDto.phoneNumber);
      case PaymentProvider.CASH:
        return this.initiateCashPayment(payment);
      default:
        throw new BadRequestException('Unsupported payment provider');
    }
  }

  private async initiateStripePayment(payment: Payment): Promise<any> {
    // TODO: Intégrer Stripe API
    return {
      paymentId: payment.id,
      status: 'pending',
      provider: 'stripe',
      message: 'Stripe integration coming soon',
    };
  }

  private async initiateFlutterwavePayment(payment: Payment, phoneNumber?: string): Promise<any> {
    // TODO: Intégrer Flutterwave API
    return {
      paymentId: payment.id,
      status: 'pending',
      provider: 'flutterwave',
      phoneNumber,
      message: 'Flutterwave integration coming soon',
    };
  }

  private async initiatePaystackPayment(payment: Payment): Promise<any> {
    // TODO: Intégrer Paystack API
    return {
      paymentId: payment.id,
      status: 'pending',
      provider: 'paystack',
      message: 'Paystack integration coming soon',
    };
  }

  private async initiateMobileMoneyPayment(payment: Payment, phoneNumber?: string): Promise<any> {
    // TODO: Intégrer Mobile Money providers
    return {
      paymentId: payment.id,
      status: 'pending',
      provider: 'mobile_money',
      phoneNumber,
      message: 'Mobile Money integration coming soon',
    };
  }

  private async initiateCashPayment(payment: Payment): Promise<any> {
    // Cash payment through agents
    return {
      paymentId: payment.id,
      status: 'pending',
      provider: 'cash',
      message: 'Cash payment instructions sent',
    };
  }

  async confirmPayment(confirmDto: ConfirmPaymentDto): Promise<Payment> {
    const payment = await this.findById(confirmDto.paymentId);

    payment.status = PaymentStatus.COMPLETED;
    payment.transactionId = confirmDto.transactionId;

    return this.paymentsRepository.save(payment);
  }

  async findById(id: string): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  async getUserPayments(userId: string, page: number = 1, limit: number = 20) {
    const [payments, total] = await this.paymentsRepository.findAndCount({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { payments, total, page };
  }

  async getPaymentStats() {
    const stats = await this.paymentsRepository
      .createQueryBuilder('payment')
      .select('COUNT(*) as total')
      .addSelect('SUM(payment.amount) as totalAmount')
      .addSelect('payment.status, COUNT(*) as count')
      .groupBy('payment.status')
      .getRawMany();

    return stats;
  }
}
