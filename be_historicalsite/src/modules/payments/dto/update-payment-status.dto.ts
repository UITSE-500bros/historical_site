import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PaymentStatus } from './create-payment.dto';

export class UpdatePaymentStatusDto {
  @ApiProperty({
    description: 'The new status of the payment',
    enum: PaymentStatus,
    example: PaymentStatus.COMPLETED,
    required: true
  })
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
