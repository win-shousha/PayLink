import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { PaymentProvider } from '../entities/payment.entity';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  metadata?: Record<string, any>;
}

export class InitiatePaymentDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}

export class ConfirmPaymentDto {
  @IsNotEmpty()
  @IsString()
  paymentId: string;

  @IsNotEmpty()
  @IsString()
  transactionId: string;
}
