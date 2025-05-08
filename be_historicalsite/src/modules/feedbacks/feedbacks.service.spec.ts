import { Test, TestingModule } from '@nestjs/testing';
import { FeedbacksService } from './feedbacks.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
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

jest.mock('uuid');

describe('FeedbacksService', () => {
  let service: FeedbacksService;
  let prisma: PrismaService;

  const mockPrismaService = {
    feedback: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbacksService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<FeedbacksService>(FeedbacksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a feedback with provided data', async () => {
      // Arrange
      const mockUuid = 'feedback-uuid';
      (uuidv4 as jest.Mock).mockReturnValue(mockUuid);
      
      const createFeedbackDto = {
        subject: FeedbackSubject.GENERAL,
        message: 'This is a test feedback',
        status: FeedbackStatus.OPEN,
      };

      const expectedFeedback = {
        feedbackId: mockUuid,
        ...createFeedbackDto,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };

      mockPrismaService.feedback.create.mockResolvedValue(expectedFeedback);

      // Act
      const result = await service.create(createFeedbackDto);

      // Assert
      expect(result).toEqual(expectedFeedback);
      expect(mockPrismaService.feedback.create).toHaveBeenCalledWith({
        data: {
          feedbackId: mockUuid,
          ...createFeedbackDto,
          status: createFeedbackDto.status || 'OPEN',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      });
    });

    it('should use default status when not provided', async () => {
      // Arrange
      const mockUuid = 'feedback-uuid';
      (uuidv4 as jest.Mock).mockReturnValue(mockUuid);
      
      const createFeedbackDto = {
        subject: FeedbackSubject.BUG,
        message: 'Found a bug in the application',
      };

      const expectedFeedback = {
        feedbackId: mockUuid,
        ...createFeedbackDto,
        status: 'OPEN',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };

      mockPrismaService.feedback.create.mockResolvedValue(expectedFeedback);

      // Act
      const result = await service.create(createFeedbackDto);

      // Assert
      expect(result).toEqual(expectedFeedback);
      expect(mockPrismaService.feedback.create).toHaveBeenCalledWith({
        data: {
          feedbackId: mockUuid,
          ...createFeedbackDto,
          status: 'OPEN',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return all feedbacks ordered by creation date', async () => {
      // Arrange
      const expectedFeedbacks = [
        {
          feedbackId: 'feedback-id-1',
          subject: FeedbackSubject.FEATURE,
          message: 'Please add this feature',
          status: FeedbackStatus.OPEN,
          createdAt: new Date('2025-05-08T10:00:00Z'),
          updatedAt: new Date('2025-05-08T10:00:00Z'),
        },
        {
          feedbackId: 'feedback-id-2',
          subject: FeedbackSubject.BUG,
          message: 'Found a bug',
          status: FeedbackStatus.IN_PROGRESS,
          createdAt: new Date('2025-05-07T10:00:00Z'),
          updatedAt: new Date('2025-05-07T10:00:00Z'),
        },
      ];

      mockPrismaService.feedback.findMany.mockResolvedValue(expectedFeedbacks);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(expectedFeedbacks);
      expect(mockPrismaService.feedback.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdAt: 'desc',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a feedback if found', async () => {
      // Arrange
      const feedbackId = 'feedback-id';
      const expectedFeedback = {
        feedbackId,
        subject: FeedbackSubject.GENERAL,
        message: 'This is a test feedback',
        status: FeedbackStatus.OPEN,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.feedback.findUnique.mockResolvedValue(expectedFeedback);

      // Act
      const result = await service.findOne(feedbackId);

      // Assert
      expect(result).toEqual(expectedFeedback);
      expect(mockPrismaService.feedback.findUnique).toHaveBeenCalledWith({
        where: { feedbackId },
      });
    });

    it('should throw NotFoundException if feedback not found', async () => {
      // Arrange
      const feedbackId = 'non-existent-id';
      mockPrismaService.feedback.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findOne(feedbackId)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.feedback.findUnique).toHaveBeenCalledWith({
        where: { feedbackId },
      });
    });
  });

  describe('update', () => {
    it('should update a feedback if found', async () => {
      // Arrange
      const feedbackId = 'feedback-id';
      const updateFeedbackDto = {
        status: FeedbackStatus.IN_PROGRESS,
        message: 'Updated message',
      };

      const expectedFeedback = {
        feedbackId,
        subject: FeedbackSubject.GENERAL,
        message: 'Updated message',
        status: FeedbackStatus.IN_PROGRESS,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.feedback.update.mockResolvedValue(expectedFeedback);

      // Act
      const result = await service.update(feedbackId, updateFeedbackDto);

      // Assert
      expect(result).toEqual(expectedFeedback);
      expect(mockPrismaService.feedback.update).toHaveBeenCalledWith({
        where: { feedbackId },
        data: updateFeedbackDto,
      });
    });

    it('should throw NotFoundException if feedback not found during update', async () => {
      // Arrange
      const feedbackId = 'non-existent-id';
      const updateFeedbackDto = { status: FeedbackStatus.CLOSED };

      mockPrismaService.feedback.update.mockRejectedValue(new Error());

      // Act & Assert
      await expect(service.update(feedbackId, updateFeedbackDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.feedback.update).toHaveBeenCalledWith({
        where: { feedbackId },
        data: updateFeedbackDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a feedback if found', async () => {
      // Arrange
      const feedbackId = 'feedback-id';
      const expectedFeedback = {
        feedbackId,
        subject: FeedbackSubject.GENERAL,
        message: 'This is a test feedback',
        status: FeedbackStatus.OPEN,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.feedback.delete.mockResolvedValue(expectedFeedback);

      // Act
      const result = await service.remove(feedbackId);

      // Assert
      expect(result).toEqual(expectedFeedback);
      expect(mockPrismaService.feedback.delete).toHaveBeenCalledWith({
        where: { feedbackId },
      });
    });

    it('should throw NotFoundException if feedback not found during removal', async () => {
      // Arrange
      const feedbackId = 'non-existent-id';
      mockPrismaService.feedback.delete.mockRejectedValue(new Error());

      // Act & Assert
      await expect(service.remove(feedbackId)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.feedback.delete).toHaveBeenCalledWith({
        where: { feedbackId },
      });
    });
  });
});
