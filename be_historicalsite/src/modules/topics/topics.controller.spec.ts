import { Test, TestingModule } from '@nestjs/testing';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { NotFoundException } from '@nestjs/common';

describe('TopicsController', () => {
  let controller: TopicsController;
  let service: TopicsService;

  // Mock data
  const mockTopic = {
    topicId: '123e4567-e89b-12d3-a456-426614174000',
    topicName: 'Art History',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTopics = [
    mockTopic,
    {
      topicId: '987fcdeb-51a2-43d7-9b56-254415f67890',
      topicName: 'World War II',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Mock service
  const mockTopicsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a topic', async () => {
      const createTopicDto = {
        topicName: 'Art History',
      };

      mockTopicsService.create.mockResolvedValue(mockTopic);

      const result = await controller.create(createTopicDto);

      expect(service.create).toHaveBeenCalledWith(createTopicDto);
      expect(result).toEqual(mockTopic);
    });
  });

  describe('findAll', () => {
    it('should return an array of topics', async () => {
      mockTopicsService.findAll.mockResolvedValue(mockTopics);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockTopics);
    });
  });

  describe('findOne', () => {
    it('should return a topic by id', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      mockTopicsService.findOne.mockResolvedValue(mockTopic);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockTopic);
    });

    it('should throw NotFoundException when topic is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      mockTopicsService.findOne.mockRejectedValue(new NotFoundException(`Topic with ID ${id} not found`));

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a topic', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const updateTopicDto = {
        topicName: 'Updated Art History',
      };

      const updatedTopic = {
        ...mockTopic,
        topicName: 'Updated Art History',
        updatedAt: new Date(),
      };

      mockTopicsService.update.mockResolvedValue(updatedTopic);

      const result = await controller.update(id, updateTopicDto);

      expect(service.update).toHaveBeenCalledWith(id, updateTopicDto);
      expect(result).toEqual(updatedTopic);
    });

    it('should throw NotFoundException when topic to update is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const updateTopicDto = {
        topicName: 'Updated Art History',
      };

      mockTopicsService.update.mockRejectedValue(new NotFoundException(`Topic with ID ${id} not found`));

      await expect(controller.update(id, updateTopicDto)).rejects.toThrow(NotFoundException);
      expect(service.update).toHaveBeenCalledWith(id, updateTopicDto);
    });
  });

  describe('remove', () => {
    it('should remove a topic', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      mockTopicsService.remove.mockResolvedValue(mockTopic);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockTopic);
    });

    it('should throw NotFoundException when topic to remove is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      mockTopicsService.remove.mockRejectedValue(new NotFoundException(`Topic with ID ${id} not found`));

      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});