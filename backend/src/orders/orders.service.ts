import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { CreateOrderDto, UpdateOrderStatusDto } from './dtos/order.dto';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.usersService.findById(userId);
    const product = await this.productsService.findById(createOrderDto.productId);

    if (!user || !product) {
      throw new NotFoundException('User or product not found');
    }

    const commission = (createOrderDto.amount * 0.05); // 5% commission
    const fees = (createOrderDto.amount * 0.01); // 1% fees
    const totalAmount = createOrderDto.amount + commission + fees;

    const order = this.ordersRepository.create({
      user,
      product,
      amount: createOrderDto.amount,
      commission,
      fees,
      totalAmount,
      paymentMethod: createOrderDto.paymentMethod,
      notes: createOrderDto.notes,
      metadata: createOrderDto.metadata,
      status: OrderStatus.PENDING,
    });

    return this.ordersRepository.save(order);
  }

  async findById(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async findUserOrders(userId: string, page: number = 1, limit: number = 20) {
    const [orders, total] = await this.ordersRepository.findAndCount({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { orders, total, page };
  }

  async updateStatus(id: string, updateDto: UpdateOrderStatusDto): Promise<Order> {
    await this.ordersRepository.update(id, {
      status: updateDto.status,
      notes: updateDto.notes,
    });

    return this.findById(id);
  }

  async getStats() {
    const stats = await this.ordersRepository
      .createQueryBuilder('order')
      .select('COUNT(*) as total')
      .addSelect('SUM(order.totalAmount) as revenue')
      .addSelect('order.status, COUNT(*) as count')
      .groupBy('order.status')
      .getRawMany();

    return stats;
  }
}
