import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

describe('TopicsService', () => {
  let service: TopicsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    topics: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockTopic = {
    topic_id: '123e4567-e89b-12d3-a456-426614174000',
    topic_name: 'World War II',
    created_at: new Date(),
    updated_at: new Date(),
    articles: [],
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
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new topic', async () => {
      const createTopicDto: CreateTopicDto = { topic_name: 'World War II' };
      mockPrismaService.topics.create.mockResolvedValue(mockTopic);

      const result = await service.create(createTopicDto);

      expect(mockPrismaService.topics.create).toHaveBeenCalledWith({
        data: createTopicDto,
      });
      expect(result).toEqual(mockTopic);
    });
  });

  describe('findAll', () => {
    it('should return an array of topics', async () => {
      mockPrismaService.topics.findMany.mockResolvedValue([mockTopic]);

      const result = await service.findAll();

      expect(mockPrismaService.topics.findMany).toHaveBeenCalled();
      expect(result).toEqual([mockTopic]);
    });
  });

  describe('findOne', () => {
    it('should return a topic by id', async () => {
      mockPrismaService.topics.findUnique.mockResolvedValue(mockTopic);

      const result = await service.findOne(mockTopic.topic_id);

      expect(mockPrismaService.topics.findUnique).toHaveBeenCalledWith({
        where: { topic_id: mockTopic.topic_id },
        include: { articles: true },
      });
      expect(result).toEqual(mockTopic);
    });

    it('should throw NotFoundException if topic not found', async () => {
      mockPrismaService.topics.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a topic', async () => {
      const updateTopicDto: UpdateTopicDto = { topic_name: 'Updated Topic' };
      mockPrismaService.topics.update.mockResolvedValue({
        ...mockTopic,
        topic_name: 'Updated Topic',
      });

      const result = await service.update(mockTopic.topic_id, updateTopicDto);

      expect(mockPrismaService.topics.update).toHaveBeenCalledWith({
        where: { topic_id: mockTopic.topic_id },
        data: updateTopicDto,
      });
      expect(result.topic_name).toEqual('Updated Topic');
    });

    it('should throw NotFoundException if topic to update not found', async () => {
      const updateTopicDto: UpdateTopicDto = { topic_name: 'Updated Topic' };
      mockPrismaService.topics.update.mockRejectedValue(new Error());

      await expect(
        service.update('non-existent-id', updateTopicDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a topic', async () => {
      mockPrismaService.topics.delete.mockResolvedValue(mockTopic);

      const result = await service.remove(mockTopic.topic_id);

      expect(mockPrismaService.topics.delete).toHaveBeenCalledWith({
        where: { topic_id: mockTopic.topic_id },
      });
      expect(result).toEqual(mockTopic);
    });

    it('should throw NotFoundException if topic to remove not found', async () => {
      mockPrismaService.topics.delete.mockRejectedValue(new Error());

      await expect(service.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
