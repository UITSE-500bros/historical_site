import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FeedbacksService {
  constructor(private prisma: PrismaService) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    return this.prisma.feedbacks.create({
      data: createFeedbackDto,
    });
  }

  async findAll() {
    return this.prisma.feedbacks.findMany();
  }

  async findOne(id: string) {
    const feedback = await this.prisma.feedbacks.findUnique({
      where: { feedback_id: id },
    });

    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }

    return feedback;
  }

  async update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    try {
      return await this.prisma.feedbacks.update({
        where: { feedback_id: id },
        data: updateFeedbackDto,
      });
    } catch (error) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.feedbacks.delete({
        where: { feedback_id: id },
      });
    } catch (error) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
  }
}
