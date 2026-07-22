import { IsEmail, IsPhoneNumber, IsNotEmpty, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  SUPPORT = 'support',
  AGENT = 'agent',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('BJ')
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  country?: string;
}
