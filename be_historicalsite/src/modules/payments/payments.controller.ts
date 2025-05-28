import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto, PaymentStatus } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'The payment has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({ status: 200, description: 'Return all payments.' })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a payment by id' })
  @ApiResponse({ status: 200, description: 'Return the payment.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }

  @Patch(':id/:status')
  @ApiOperation({
    summary: 'Update a payment status',
    description: 'Updates the status of a payment using the payment ID and the new status provided in the URL path.'
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the payment to update',
    type: 'string',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
  })
  @ApiParam({
    name: 'status',
    description: 'The new status of the payment',
    enum: PaymentStatus,
    example: PaymentStatus.COMPLETED
  })
  @ApiResponse({ status: 200, description: 'The payment status has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid status or payment already completed.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  update(
    @Param('id') id: string, 
    @Param('status') status: string
  ) {
    return this.paymentsService.updatePaymentStatus(id, status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a payment' })
  @ApiResponse({ status: 204, description: 'The payment has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(id);
  }
}
