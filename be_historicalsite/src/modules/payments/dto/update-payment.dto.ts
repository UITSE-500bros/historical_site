import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto, PaymentStatus } from './create-payment.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
    @ApiProperty({ example: 'test-id-1' })
    paymentId?: string;
    @ApiProperty({ example: PaymentStatus.COMPLETED })
    status?: PaymentStatus;
}
