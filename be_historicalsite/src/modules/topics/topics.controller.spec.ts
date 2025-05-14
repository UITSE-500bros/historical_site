import { Test, TestingModule } from '@nestjs/testing';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

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

  // Mock services
  const mockTopicsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  // Mock JWT service
  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  // Mock Auth service
  const mockAuthService = {
    validateAdmin: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicsController],
      providers: [
        {
          provide: TopicsService,
          useValue: mockTopicsService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        JwtAuthGuard,
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
        topicName: 'Test Topic',
        topicImage: 'test.jpg',
      };

      const expectedTopic = {
        topicId: uuidv4(),
        ...createTopicDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTopicsService.create.mockResolvedValue(expectedTopic);

      const result = await controller.create(createTopicDto);

      expect(result).toEqual(expectedTopic);
      expect(mockTopicsService.create).toHaveBeenCalledWith(createTopicDto);
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

      mockTopicsService.findAll.mockResolvedValue(expectedTopics);

      const result = await controller.findAll();

      expect(result).toEqual(expectedTopics);
      expect(mockTopicsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a topic by id', async () => {
      const topicId = uuidv4();
      const expectedTopic = {
        topicId,
        topicName: 'Test Topic',
        topicImage: 'test.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTopicsService.findOne.mockResolvedValue(expectedTopic);

      const result = await controller.findOne(topicId);

      expect(result).toEqual(expectedTopic);
      expect(mockTopicsService.findOne).toHaveBeenCalledWith(topicId);
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

      mockTopicsService.update.mockResolvedValue(expectedTopic);

      const result = await controller.update(topicId, updateTopicDto);

      expect(result).toEqual(expectedTopic);
      expect(mockTopicsService.update).toHaveBeenCalledWith(topicId, updateTopicDto);
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
      const topicId = uuidv4();
      const expectedTopic = {
        topicId,
        topicName: 'Test Topic',
        topicImage: 'test.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTopicsService.remove.mockResolvedValue(expectedTopic);

      const result = await controller.remove(topicId);

      expect(result).toEqual(expectedTopic);
      expect(mockTopicsService.remove).toHaveBeenCalledWith(topicId);
    });

    it('should throw NotFoundException when topic to remove is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      mockTopicsService.remove.mockRejectedValue(new NotFoundException(`Topic with ID ${id} not found`));

      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});