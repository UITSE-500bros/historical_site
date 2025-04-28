import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus, PaymentType } from 'prisma/generated/prisma';

export class Payment {
  @ApiProperty({
    description: 'The unique identifier for the payment',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    format: 'uuid'
  })
  paymentId: string;

  @ApiProperty({
    description: 'The email of the user making the payment',
    example: 'user@example.com'
  })
  userEmail: string;

  @ApiProperty({
    description: 'The quantity of items being purchased',
    example: 2
  })
  quantity: number;

  @ApiProperty({
    description: 'The type of payment',
    enum: PaymentType,
    example: PaymentType.DEBIT_CARD
  })
  paymentType: PaymentType;

  @ApiProperty({
    description: 'The status of the payment',
    enum: PaymentStatus,
    example: PaymentStatus.PENDING
  })
  status: PaymentStatus;

  @ApiProperty({
    description: 'The booking date for the payment',
    example: '2023-04-22T12:00:00Z',
    format: 'date-time'
  })
  bookingDate: Date;

  @ApiProperty({
    description: 'The total price of the payment',
    example: '99.99'
  })
  totalPrice: string;

  @ApiProperty({
    description: 'The timestamp when the payment was created',
    example: '2023-04-22T12:00:00Z',
    format: 'date-time'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the payment was last updated',
    example: '2023-04-22T12:00:00Z',
    format: 'date-time'
  })
  updatedAt: Date;
}
