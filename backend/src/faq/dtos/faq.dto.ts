import { IsNotEmpty, IsString, IsEnum, IsOptional, IsArray, IsBoolean, IsNumber } from 'class-validator';
import { FaqCategory } from '../entities/faq.entity';

export class CreateFaqDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsNotEmpty()
  @IsEnum(FaqCategory)
  category: FaqCategory;

  @IsOptional()
  @IsArray()
  keywords?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  order?: number;
}

export class UpdateFaqDto {
  @IsOptional()
  @IsString()
  question?: string;

  @IsOptional()
  @IsString()
  answer?: string;

  @IsOptional()
  @IsEnum(FaqCategory)
  category?: FaqCategory;

  @IsOptional()
  @IsArray()
  keywords?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  order?: number;
}
