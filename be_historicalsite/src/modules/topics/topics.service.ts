import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}

  async create(createTopicDto: CreateTopicDto) {
    return this.prisma.topics.create({
      data: createTopicDto,
    });
  }

  async findAll() {
    return this.prisma.topics.findMany();
  }

  async findOne(id: string) {
    const topic = await this.prisma.topics.findUnique({
      where: { topic_id: id },
      include: { articles: true },
    });

    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }

    return topic;
  }

  async update(id: string, updateTopicDto: UpdateTopicDto) {
    try {
      return await this.prisma.topics.update({
        where: { topic_id: id },
        data: updateTopicDto,
      });
    } catch (error) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.topics.delete({
        where: { topic_id: id },
      });
    } catch (error) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
  }
}
