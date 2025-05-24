import { Test, TestingModule } from '@nestjs/testing';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';
import { NotFoundException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

enum FeedbackSubject {
  BUG = 'BUG',
  FEATURE = 'FEATURE',
  GENERAL = 'GENERAL'
}

enum FeedbackStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED'
}

describe('FeedbacksController', () => {
  let controller: FeedbacksController;
  let service: FeedbacksService;

  const mockFeedbacksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbacksController],
      providers: [
        {
          provide: FeedbacksService,
          useValue: mockFeedbacksService,
        },
      ],
    }).compile();

    controller = module.get<FeedbacksController>(FeedbacksController);
    service = module.get<FeedbacksService>(FeedbacksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new feedback', async () => {
      // Arrange
      const createFeedbackDto = {
        subject: FeedbackSubject.GENERAL,
        message: 'This is a test feedback',
        status: FeedbackStatus.OPEN,
      };

      const expectedResult = {
        feedbackId: uuidv4(),
        ...createFeedbackDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFeedbacksService.create.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.create(createFeedbackDto);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockFeedbacksService.create).toHaveBeenCalledWith(createFeedbackDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of feedbacks', async () => {
      // Arrange
      const expectedResult = [
        {
          feedbackId: uuidv4(),
          subject: FeedbackSubject.BUG,
          message: 'Found a bug',
          status: FeedbackStatus.OPEN,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          feedbackId: uuidv4(),
          subject: FeedbackSubject.FEATURE,
          message: 'Please add this feature',
          status: FeedbackStatus.IN_PROGRESS,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockFeedbacksService.findAll.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockFeedbacksService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single feedback', async () => {
      // Arrange
      const feedbackId = uuidv4();
      const expectedResult = {
        feedbackId,
        subject: FeedbackSubject.GENERAL,
        message: 'This is a test feedback',
        status: FeedbackStatus.OPEN,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFeedbacksService.findOne.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.findOne(feedbackId);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockFeedbacksService.findOne).toHaveBeenCalledWith(feedbackId);
    });

    it('should throw NotFoundException when feedback is not found', async () => {
      // Arrange
      const feedbackId = 'non-existent-id';
      mockFeedbacksService.findOne.mockRejectedValue(
        new NotFoundException(`Feedback with ID ${feedbackId} not found`),
      );

      // Act & Assert
      await expect(controller.findOne(feedbackId)).rejects.toThrow(NotFoundException);
      expect(mockFeedbacksService.findOne).toHaveBeenCalledWith(feedbackId);
    });
  });

  describe('update', () => {
    it('should update a feedback', async () => {
      // Arrange
      const feedbackId = uuidv4();
      const updateFeedbackDto = {
        status: FeedbackStatus.IN_PROGRESS,
        message: 'Updated message',
      };

      const expectedResult = {
        feedbackId,
        subject: FeedbackSubject.GENERAL,
        message: 'Updated message',
        status: FeedbackStatus.IN_PROGRESS,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFeedbacksService.update.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.update(feedbackId, updateFeedbackDto);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockFeedbacksService.update).toHaveBeenCalledWith(feedbackId, updateFeedbackDto);
    });

    it('should throw NotFoundException when feedback to update is not found', async () => {
      // Arrange
      const feedbackId = 'non-existent-id';
      const updateFeedbackDto = { status: FeedbackStatus.CLOSED };

      mockFeedbacksService.update.mockRejectedValue(
        new NotFoundException(`Feedback with ID ${feedbackId} not found`),
      );

      // Act & Assert
      await expect(controller.update(feedbackId, updateFeedbackDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockFeedbacksService.update).toHaveBeenCalledWith(feedbackId, updateFeedbackDto);
    });
  });

  describe('remove', () => {
    it('should remove a feedback', async () => {
      // Arrange
      const feedbackId = uuidv4();
      const expectedResult = {
        feedbackId,
        subject: FeedbackSubject.GENERAL,
        message: 'This is a test feedback',
        status: FeedbackStatus.OPEN,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFeedbacksService.remove.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.remove(feedbackId);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockFeedbacksService.remove).toHaveBeenCalledWith(feedbackId);
    });

    it('should throw NotFoundException when feedback to remove is not found', async () => {
      // Arrange
      const feedbackId = 'non-existent-id';
      mockFeedbacksService.remove.mockRejectedValue(
        new NotFoundException(`Feedback with ID ${feedbackId} not found`),
      );

      // Act & Assert
      await expect(controller.remove(feedbackId)).rejects.toThrow(NotFoundException);
      expect(mockFeedbacksService.remove).toHaveBeenCalledWith(feedbackId);
    });
  });
});
