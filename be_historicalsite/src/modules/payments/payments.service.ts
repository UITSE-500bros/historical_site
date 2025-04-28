import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: {
        paymentId: uuidv4(),
        ...createPaymentDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
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
        data: updatePaymentDto,
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
