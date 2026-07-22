import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  identifier: string; // email ou phone

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class RegisterDto {
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
}

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export class VerifyTwoFactorDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}
