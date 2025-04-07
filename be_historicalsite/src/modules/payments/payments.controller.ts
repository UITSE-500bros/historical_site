import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new payment',
    description: 'Creates a new payment with the provided details.'
  })
  @ApiBody({ 
    type: CreatePaymentDto,
    description: 'Payment data to create'
  })
  @ApiCreatedResponse({ 
    description: 'The payment has been successfully created.',
    type: Payment 
  })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all payments',
    description: 'Retrieves a list of all payments in the system.'
  })
  @ApiOkResponse({ 
    description: 'List of all payments',
    type: [Payment],
    isArray: true
  })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a payment by ID',
    description: 'Retrieves a specific payment by its UUID.'
  })
  @ApiParam({ 
    name: 'id',
    description: 'The UUID of the payment',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiOkResponse({ 
    description: 'The payment',
    type: Payment 
  })
  @ApiNotFoundResponse({ 
    description: 'Payment with the specified ID was not found'
  })
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update a payment',
    description: 'Updates a specific payment by its UUID with the provided data.'
  })
  @ApiParam({ 
    name: 'id',
    description: 'The UUID of the payment to update',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({ 
    type: UpdatePaymentDto,
    description: 'Payment data to update'
  })
  @ApiOkResponse({ 
    description: 'The payment has been successfully updated',
    type: Payment 
  })
  @ApiNotFoundResponse({ 
    description: 'Payment with the specified ID was not found'
  })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete a payment',
    description: 'Removes a specific payment by its UUID from the system.'
  })
  @ApiParam({ 
    name: 'id',
    description: 'The UUID of the payment to delete',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiOkResponse({ 
    description: 'The payment has been successfully deleted',
    type: Payment 
  })
  @ApiNotFoundResponse({ 
    description: 'Payment with the specified ID was not found'
  })
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(id);
  }
}
