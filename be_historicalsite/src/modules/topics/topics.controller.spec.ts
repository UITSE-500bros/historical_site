import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

describe('TopicsController', () => {
  let controller: TopicsController;
  let service: TopicsService;

  const mockTopicsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
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
      controllers: [TopicsController],
      providers: [
        {
          provide: TopicsService,
          useValue: mockTopicsService,
        },
      ],
    }).compile();

    controller = module.get<TopicsController>(TopicsController);
    service = module.get<TopicsService>(TopicsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new topic', async () => {
      const createTopicDto: CreateTopicDto = { topic_name: 'World War II' };
      mockTopicsService.create.mockResolvedValue(mockTopic);

      const result = await controller.create(createTopicDto);

      expect(mockTopicsService.create).toHaveBeenCalledWith(createTopicDto);
      expect(result).toEqual(mockTopic);
    });
  });

  describe('findAll', () => {
    it('should return an array of topics', async () => {
      mockTopicsService.findAll.mockResolvedValue([mockTopic]);

      const result = await controller.findAll();

      expect(mockTopicsService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockTopic]);
    });
  });

  describe('findOne', () => {
    it('should return a single topic', async () => {
      mockTopicsService.findOne.mockResolvedValue(mockTopic);

      const result = await controller.findOne(mockTopic.topic_id);

      expect(mockTopicsService.findOne).toHaveBeenCalledWith(mockTopic.topic_id);
      expect(result).toEqual(mockTopic);
    });

    it('should handle NotFoundException', async () => {
      mockTopicsService.findOne.mockRejectedValue(
        new NotFoundException(`Topic with ID non-existent-id not found`),
      );

      await expect(controller.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a topic', async () => {
      const updateTopicDto: UpdateTopicDto = { topic_name: 'Updated Topic' };
      const updatedTopic = { ...mockTopic, topic_name: 'Updated Topic' };
      mockTopicsService.update.mockResolvedValue(updatedTopic);

      const result = await controller.update(
        mockTopic.topic_id,
        updateTopicDto,
      );

      expect(mockTopicsService.update).toHaveBeenCalledWith(
        mockTopic.topic_id,
        updateTopicDto,
      );
      expect(result).toEqual(updatedTopic);
    });

    it('should handle NotFoundException', async () => {
      const updateTopicDto: UpdateTopicDto = { topic_name: 'Updated Topic' };
      mockTopicsService.update.mockRejectedValue(
        new NotFoundException(`Topic with ID non-existent-id not found`),
      );

      await expect(
        controller.update('non-existent-id', updateTopicDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a topic', async () => {
      mockTopicsService.remove.mockResolvedValue(mockTopic);

      const result = await controller.remove(mockTopic.topic_id);

      expect(mockTopicsService.remove).toHaveBeenCalledWith(mockTopic.topic_id);
      expect(result).toEqual(mockTopic);
    });

    it('should handle NotFoundException', async () => {
      mockTopicsService.remove.mockRejectedValue(
        new NotFoundException(`Topic with ID non-existent-id not found`),
      );

      await expect(controller.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
