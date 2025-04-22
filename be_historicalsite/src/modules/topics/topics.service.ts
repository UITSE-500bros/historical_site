import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { prismaClient } from '../../prisma/prisma.service';

@Injectable()
export class TopicsService {
  async create(createTopicDto: CreateTopicDto) {
    return prismaClient.topic.create({
      data: {
        topicName: createTopicDto.topicName,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async findAll() {
    return prismaClient.topic.findMany();
  }

  async findOne(id: string) {
    const topic = await prismaClient.topic.findUnique({
      where: { topicId: id },
    });
    
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    
    return topic;
  }

  async update(id: string, updateTopicDto: UpdateTopicDto) {
    // Check if topic exists
    const existingTopic = await prismaClient.topic.findUnique({
      where: { topicId: id },
    });
    
    if (!existingTopic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    
    // Update only the fields that are provided
    const updateData: any = { updatedAt: new Date() };
    
    if (updateTopicDto.topicName !== undefined) {
      updateData.topicName = updateTopicDto.topicName;
    }
    
    return prismaClient.topic.update({
      where: { topicId: id },
      data: updateData,
    });
  }

  async remove(id: string) {
    // Check if topic exists
    const existingTopic = await prismaClient.topic.findUnique({
      where: { topicId: id },
    });
    
    if (!existingTopic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    
    return prismaClient.topic.delete({
      where: { topicId: id },
    });
  }
}
