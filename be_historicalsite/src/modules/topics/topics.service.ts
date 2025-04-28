import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}

  async create(createTopicDto: CreateTopicDto) {
    return this.prisma.topic.create({
      data: {
        topicId: uuidv4(),
        ...createTopicDto,
      },
    });
  }

  async findAll() {
    return this.prisma.topic.findMany({
      orderBy: {
        topicName: 'asc',
      },
      include: {
        eventArticles: {
          include: {
            article: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const topic = await this.prisma.topic.findUnique({
      where: { topicId: id },
      include: {
        eventArticles: {
          include: {
            article: true,
          },
        },
      },
    });

    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }

    return topic;
  }

  async update(id: string, updateTopicDto: UpdateTopicDto) {
    try {
      return await this.prisma.topic.update({
        where: { topicId: id },
        data: updateTopicDto,
      });
    } catch (error) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.topic.delete({
        where: { topicId: id },
      });
    } catch (error) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
  }
}
