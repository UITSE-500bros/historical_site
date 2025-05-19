import { Test, TestingModule } from '@nestjs/testing';
import { TopicsService } from './topics.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

describe('TopicsService', () => {
  let service: TopicsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    topic: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TopicsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TopicsService>(TopicsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a topic', async () => {
      const createTopicDto = {
        topicName: 'Test Topic',
        topicImage: 'test.jpg',
      };

      const expectedTopic = {
        topicId: expect.any(String),
        ...createTopicDto,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };

      mockPrismaService.topic.create.mockResolvedValue(expectedTopic);

      const result = await service.create(createTopicDto);

      expect(result).toEqual(expectedTopic);
      expect(mockPrismaService.topic.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          topicId: expect.any(String),
          ...createTopicDto,
        }),
      });
    });
  });

  describe('findAll', () => {
    it('should return all topics', async () => {
      const expectedTopics = [
        {
          topicId: uuidv4(),
          topicName: 'Test Topic',
          topicImage: 'test.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrismaService.topic.findMany.mockResolvedValue(expectedTopics);

      const result = await service.findAll();

      expect(result).toEqual(expectedTopics);
      expect(mockPrismaService.topic.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a topic if found', async () => {
      const topicId = uuidv4();
      const expectedTopic = {
        topicId,
        topicName: 'Test Topic',
        topicImage: 'test.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.topic.findUnique.mockResolvedValue(expectedTopic);

      const result = await service.findOne(topicId);

      expect(result).toEqual(expectedTopic);
      expect(mockPrismaService.topic.findUnique).toHaveBeenCalledWith({
        where: { topicId },
      });
    });

    it('should throw NotFoundException if topic not found', async () => {
      const topicId = uuidv4();
      mockPrismaService.topic.findUnique.mockResolvedValue(null);

      await expect(service.findOne(topicId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a topic if found', async () => {
      const topicId = uuidv4();
      const updateTopicDto = {
        topicName: 'Updated Topic',
      };

      const expectedTopic = {
        topicId,
        topicName: 'Updated Topic',
        topicImage: 'test.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.topic.update.mockResolvedValue(expectedTopic);

      const result = await service.update(topicId, updateTopicDto);

      expect(result).toEqual(expectedTopic);
      expect(mockPrismaService.topic.update).toHaveBeenCalledWith({
        where: { topicId },
        data: updateTopicDto,
      });
    });

    it('should throw NotFoundException if topic not found', async () => {
      const topicId = uuidv4();
      mockPrismaService.topic.update.mockRejectedValue(new Error());

      await expect(service.update(topicId, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a topic if found', async () => {
      const topicId = uuidv4();
      const expectedTopic = {
        topicId,
        topicName: 'Test Topic',
        topicImage: 'test.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.topic.delete.mockResolvedValue(expectedTopic);

      const result = await service.remove(topicId);

      expect(result).toEqual(expectedTopic);
      expect(mockPrismaService.topic.delete).toHaveBeenCalledWith({
        where: { topicId },
      });
    });

    it('should throw NotFoundException if topic not found', async () => {
      const topicId = uuidv4();
      mockPrismaService.topic.delete.mockRejectedValue(new Error());

      await expect(service.remove(topicId)).rejects.toThrow(NotFoundException);
    });
  });
});
