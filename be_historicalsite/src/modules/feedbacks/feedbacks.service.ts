import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { v4 as uuidv4 } from 'uuid';

enum FeedbackStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED'
}

@Injectable()
export class FeedbacksService {
  constructor(private prisma: PrismaService) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    return this.prisma.feedback.create({
      data: {
        feedbackId: uuidv4(),
        ...createFeedbackDto,
        status: createFeedbackDto.status || FeedbackStatus.OPEN,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  }

  async findAll() {
    return this.prisma.feedback.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const feedback = await this.prisma.feedback.findUnique({
      where: { feedbackId: id },
    });

    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }

    return feedback;
  }

  async update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    try {
      return await this.prisma.feedback.update({
        where: { feedbackId: id },
        data: updateFeedbackDto,
      });
    } catch (error) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.feedback.delete({
        where: { feedbackId: id },
      });
    } catch (error) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
  }
}
