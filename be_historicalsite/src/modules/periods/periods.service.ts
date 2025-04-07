import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PeriodsService {
  constructor(private prisma: PrismaService) {}

  async create(createPeriodDto: CreatePeriodDto) {
    return this.prisma.periods.create({
      data: {
        period_name: createPeriodDto.period_name,
        start_year: BigInt(createPeriodDto.start_year),
        end_year: BigInt(createPeriodDto.end_year),
      },
    });
  }

  async findAll() {
    const periods = await this.prisma.periods.findMany();
    return periods.map(period => ({
      ...period,
      start_year: Number(period.start_year),
      end_year: Number(period.end_year),
    }));
  }

  async findOne(id: string) {
    const period = await this.prisma.periods.findUnique({
      where: { period_id: id },
      include: { articles: true },
    });

    if (!period) {
      throw new NotFoundException(`Period with ID ${id} not found`);
    }

    return {
      ...period,
      start_year: Number(period.start_year),
      end_year: Number(period.end_year),
    };
  }

  async update(id: string, updatePeriodDto: UpdatePeriodDto) {
    try {
      const data: any = { ...updatePeriodDto };
      
      if (updatePeriodDto.start_year !== undefined) {
        data.start_year = BigInt(updatePeriodDto.start_year);
      }
      
      if (updatePeriodDto.end_year !== undefined) {
        data.end_year = BigInt(updatePeriodDto.end_year);
      }
      
      const period = await this.prisma.periods.update({
        where: { period_id: id },
        data,
      });
      
      return {
        ...period,
        start_year: Number(period.start_year),
        end_year: Number(period.end_year),
      };
    } catch (error) {
      throw new NotFoundException(`Period with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      const period = await this.prisma.periods.delete({
        where: { period_id: id },
      });
      
      return {
        ...period,
        start_year: Number(period.start_year),
        end_year: Number(period.end_year),
      };
    } catch (error) {
      throw new NotFoundException(`Period with ID ${id} not found`);
    }
  }
}
