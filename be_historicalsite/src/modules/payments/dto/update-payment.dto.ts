import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto, PaymentStatus } from './create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
    paymentId?: string;
    status?: PaymentStatus;
}
