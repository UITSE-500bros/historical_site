import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PeriodsService {
  constructor(private prisma: PrismaService) {}

  async create(createPeriodDto: CreatePeriodDto) {
    return this.prisma.period.create({
      data: {
        periodId: uuidv4(),
        ...createPeriodDto,
      },
    });
  }

  async findAll() {
    return this.prisma.period.findMany({
      orderBy: {
        startYear: 'asc',
      }
    });
  }

  async findOne(id: string) {
    const period = await this.prisma.period.findUnique({
      where: { periodId: id }
    });

    if (!period) {
      throw new NotFoundException(`Period with ID ${id} not found`);
    }

    return period;
  }

  async update(id: string, updatePeriodDto: UpdatePeriodDto) {
    try {
      return await this.prisma.period.update({
        where: { periodId: id },
        data: updatePeriodDto,
      });
    } catch (error) {
      throw new NotFoundException(`Period with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.period.delete({
        where: { periodId: id },
      });
    } catch (error) {
      throw new NotFoundException(`Period with ID ${id} not found`);
    }
  }
}
