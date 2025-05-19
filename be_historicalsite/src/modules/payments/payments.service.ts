import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { v4 as uuidv4 } from 'uuid';
import Stripe from "stripe";

@Injectable()
export class PaymentsService {
  private stripe =  new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2025-04-30.basil' });
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(createPaymentDto: CreatePaymentDto) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'vnd', 
            product_data: {
              name: 'Your Product Name', 
            },
            unit_amount: createPaymentDto.totalPrice * 100, 
          },
          quantity: createPaymentDto.quantity || 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payments/cancel`,
    });
    const result = await this.prisma.payment.create({
      data: {
        paymentId: uuidv4(),
        ...createPaymentDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    if (!result){
      throw new BadRequestException('Failed to create payment');
    }
    return { url: session.url };
  }

  async findAll() {
    return this.prisma.payment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { paymentId: id },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    try {
      return await this.prisma.payment.update({
        where: { paymentId: id },
        data: {
          ...updatePaymentDto,
          
        },
      });
    } catch (error) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.payment.delete({
        where: { paymentId: id },
      });
    } catch (error) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  }
}
