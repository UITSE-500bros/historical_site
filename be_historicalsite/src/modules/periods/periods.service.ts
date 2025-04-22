import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { prismaClient } from '../../prisma/prisma.service';

@Injectable()
export class PeriodsService {
  async create(createPeriodDto: CreatePeriodDto) {
    return prismaClient.period.create({
      data: {
        periodName: createPeriodDto.periodName,
        startYear: createPeriodDto.startYear,
        endYear: createPeriodDto.endYear,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async findAll() {
    return prismaClient.period.findMany();
  }

  async findOne(id: string) {
    const period = await prismaClient.period.findUnique({
      where: { periodId: id },
    });
    
    if (!period) {
      throw new NotFoundException(`Period with ID ${id} not found`);
    }
    
    return period;
  }

  async update(id: string, updatePeriodDto: UpdatePeriodDto) {
    // Check if period exists
    const existingPeriod = await prismaClient.period.findUnique({
      where: { periodId: id },
    });
    
    if (!existingPeriod) {
      throw new NotFoundException(`Period with ID ${id} not found`);
    }
    
    // Update only the fields that are provided
    const updateData: any = { updatedAt: new Date() };
    
    if (updatePeriodDto.periodName !== undefined) {
      updateData.periodName = updatePeriodDto.periodName;
    }
    
    if (updatePeriodDto.startYear !== undefined) {
      updateData.startYear = updatePeriodDto.startYear;
    }
    
    if (updatePeriodDto.endYear !== undefined) {
      updateData.endYear = updatePeriodDto.endYear;
    }
    
    return prismaClient.period.update({
      where: { periodId: id },
      data: updateData,
    });
  }

  async remove(id: string) {
    // Check if period exists
    const existingPeriod = await prismaClient.period.findUnique({
      where: { periodId: id },
    });
    
    if (!existingPeriod) {
      throw new NotFoundException(`Period with ID ${id} not found`);
    }
    
    return prismaClient.period.delete({
      where: { periodId: id },
    });
  }
}
