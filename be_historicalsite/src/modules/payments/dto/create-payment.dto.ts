import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { PaymentType, PaymentStatus } from 'generated/prisma/client';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'The email of the user making the payment',
    example: 'user@example.com',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  userEmail: string;

  @ApiProperty({
    description: 'The quantity of items being purchased',
    example: 2,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'The type of payment',
    enum: PaymentType,
    example: PaymentType.DEBIT_CARD,
    required: true
  })
  @IsNotEmpty()
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @ApiProperty({
    description: 'The status of the payment',
    enum: PaymentStatus,
    example: PaymentStatus.PENDING,
    required: true
  })
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiProperty({
    description: 'The booking date for the payment',
    example: '2023-04-22T12:00:00Z',
    required: true
  })
  @IsNotEmpty()
  @IsDateString()
  bookingDate: Date;

  @ApiProperty({
    description: 'The total price of the payment',
    example: '99.99',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  totalPrice: string;
}
