import { Test, TestingModule } from '@nestjs/testing';
import { TopicsService } from './topics.service';
import { NotFoundException } from '@nestjs/common';
import { prismaClient } from '../../prisma/prisma.service';

// Mock the Prisma client
jest.mock('../../prisma/prisma.service', () => ({
  prismaClient: {
    topic: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('TopicsService', () => {
  let service: TopicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicsService],
    }).compile();

    service = module.get<TopicsService>(TopicsService);
    
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new topic', async () => {
      const createTopicDto = {
        topicName: 'Art History',
      };
      
      const expectedTopic = {
        topicId: '123e4567-e89b-12d3-a456-426614174000',
        topicName: 'Art History',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      jest.spyOn(prismaClient.topic, 'create').mockResolvedValue(expectedTopic);
      
      const result = await service.create(createTopicDto);
      
      expect(prismaClient.topic.create).toHaveBeenCalledWith({
        data: {
          topicName: createTopicDto.topicName,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      });
      
      expect(result).toEqual(expectedTopic);
    });
  });

  describe('findAll', () => {
    it('should return an array of topics', async () => {
      const expectedTopics = [
        {
          topicId: '123e4567-e89b-12d3-a456-426614174000',
          topicName: 'Art History',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topicId: '987fcdeb-51a2-43d7-9b56-254415f67890',
          topicName: 'World War II',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      
      jest.spyOn(prismaClient.topic, 'findMany').mockResolvedValue(expectedTopics);
      
      const result = await service.findAll();
      
      expect(prismaClient.topic.findMany).toHaveBeenCalled();
      expect(result).toEqual(expectedTopics);
    });
  });

  describe('findOne', () => {
    it('should return a topic by id', async () => {
      const topicId = '123e4567-e89b-12d3-a456-426614174000';
      const expectedTopic = {
        topicId,
        topicName: 'Art History',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      jest.spyOn(prismaClient.topic, 'findUnique').mockResolvedValue(expectedTopic);
      
      const result = await service.findOne(topicId);
      
      expect(prismaClient.topic.findUnique).toHaveBeenCalledWith({
        where: { topicId },
      });
      expect(result).toEqual(expectedTopic);
    });

    it('should throw NotFoundException when topic is not found', async () => {
      const topicId = '123e4567-e89b-12d3-a456-426614174000';
      
      jest.spyOn(prismaClient.topic, 'findUnique').mockResolvedValue(null);
      
      await expect(service.findOne(topicId)).rejects.toThrow(NotFoundException);
      expect(prismaClient.topic.findUnique).toHaveBeenCalledWith({
        where: { topicId },
      });
    });
  });

  describe('update', () => {
    it('should update a topic', async () => {
      const topicId = '123e4567-e89b-12d3-a456-426614174000';
      const updateTopicDto = {
        topicName: 'Updated Art History',
      };
      
      const existingTopic = {
        topicId,
        topicName: 'Art History',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const expectedUpdatedTopic = {
        ...existingTopic,
        topicName: 'Updated Art History',
        updatedAt: new Date(),
      };
      
      jest.spyOn(prismaClient.topic, 'findUnique').mockResolvedValue(existingTopic);
      jest.spyOn(prismaClient.topic, 'update').mockResolvedValue(expectedUpdatedTopic);
      
      const result = await service.update(topicId, updateTopicDto);
      
      expect(prismaClient.topic.findUnique).toHaveBeenCalledWith({
        where: { topicId },
      });
      expect(prismaClient.topic.update).toHaveBeenCalledWith({
        where: { topicId },
        data: {
          topicName: updateTopicDto.topicName,
          updatedAt: expect.any(Date),
        },
      });
      expect(result).toEqual(expectedUpdatedTopic);
    });

    it('should throw NotFoundException when topic to update is not found', async () => {
      const topicId = '123e4567-e89b-12d3-a456-426614174000';
      const updateTopicDto = {
        topicName: 'Updated Art History',
      };
      
      jest.spyOn(prismaClient.topic, 'findUnique').mockResolvedValue(null);
      
      await expect(service.update(topicId, updateTopicDto)).rejects.toThrow(NotFoundException);
      expect(prismaClient.topic.findUnique).toHaveBeenCalledWith({
        where: { topicId },
      });
      expect(prismaClient.topic.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a topic', async () => {
      const topicId = '123e4567-e89b-12d3-a456-426614174000';
      const expectedTopic = {
        topicId,
        topicName: 'Art History',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      jest.spyOn(prismaClient.topic, 'findUnique').mockResolvedValue(expectedTopic);
      jest.spyOn(prismaClient.topic, 'delete').mockResolvedValue(expectedTopic);
      
      const result = await service.remove(topicId);
      
      expect(prismaClient.topic.findUnique).toHaveBeenCalledWith({
        where: { topicId },
      });
      expect(prismaClient.topic.delete).toHaveBeenCalledWith({
        where: { topicId },
      });
      expect(result).toEqual(expectedTopic);
    });

    it('should throw NotFoundException when topic to remove is not found', async () => {
      const topicId = '123e4567-e89b-12d3-a456-426614174000';
      
      jest.spyOn(prismaClient.topic, 'findUnique').mockResolvedValue(null);
      
      await expect(service.remove(topicId)).rejects.toThrow(NotFoundException);
      expect(prismaClient.topic.findUnique).toHaveBeenCalledWith({
        where: { topicId },
      });
      expect(prismaClient.topic.delete).not.toHaveBeenCalled();
    });
  });
});
