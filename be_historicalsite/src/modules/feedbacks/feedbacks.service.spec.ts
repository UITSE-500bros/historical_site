import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

describe('FeedbacksService', () => {
  let service: FeedbacksService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    feedbacks: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockFeedback = {
    feedback_id: '123e4567-e89b-12d3-a456-426614174000',
    user_email: 'user@example.com',
    subject: 'Suggestion',
    message: 'I have a suggestion for the site',
    status: 'Pending',
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
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
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new feedback', async () => {
      const createFeedbackDto: CreateFeedbackDto = { 
        user_email: 'user@example.com',
        subject: 'Suggestion',
        message: 'I have a suggestion for the site',
      };
      mockPrismaService.feedbacks.create.mockResolvedValue(mockFeedback);

      const result = await service.create(createFeedbackDto);

      expect(mockPrismaService.feedbacks.create).toHaveBeenCalledWith({
        data: createFeedbackDto,
      });
      expect(result).toEqual(mockFeedback);
    });
  });

  describe('findAll', () => {
    it('should return an array of feedbacks', async () => {
      mockPrismaService.feedbacks.findMany.mockResolvedValue([mockFeedback]);

      const result = await service.findAll();

      expect(mockPrismaService.feedbacks.findMany).toHaveBeenCalled();
      expect(result).toEqual([mockFeedback]);
    });
  });

  describe('findOne', () => {
    it('should return a feedback by id', async () => {
      mockPrismaService.feedbacks.findUnique.mockResolvedValue(mockFeedback);

      const result = await service.findOne(mockFeedback.feedback_id);

      expect(mockPrismaService.feedbacks.findUnique).toHaveBeenCalledWith({
        where: { feedback_id: mockFeedback.feedback_id },
      });
      expect(result).toEqual(mockFeedback);
    });

    it('should throw NotFoundException if feedback not found', async () => {
      mockPrismaService.feedbacks.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a feedback', async () => {
      const updateFeedbackDto: UpdateFeedbackDto = { status: 'Resolved' };
      const updatedFeedback = {
        ...mockFeedback,
        status: 'Resolved',
      };
      mockPrismaService.feedbacks.update.mockResolvedValue(updatedFeedback);

      const result = await service.update(mockFeedback.feedback_id, updateFeedbackDto);

      expect(mockPrismaService.feedbacks.update).toHaveBeenCalledWith({
        where: { feedback_id: mockFeedback.feedback_id },
        data: updateFeedbackDto,
      });
      expect(result).toEqual(updatedFeedback);
    });

    it('should throw NotFoundException if feedback to update not found', async () => {
      const updateFeedbackDto: UpdateFeedbackDto = { status: 'Resolved' };
      mockPrismaService.feedbacks.update.mockRejectedValue(new Error());

      await expect(
        service.update('non-existent-id', updateFeedbackDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a feedback', async () => {
      mockPrismaService.feedbacks.delete.mockResolvedValue(mockFeedback);

      const result = await service.remove(mockFeedback.feedback_id);

      expect(mockPrismaService.feedbacks.delete).toHaveBeenCalledWith({
        where: { feedback_id: mockFeedback.feedback_id },
      });
      expect(result).toEqual(mockFeedback);
    });

    it('should throw NotFoundException if feedback to remove not found', async () => {
      mockPrismaService.feedbacks.delete.mockRejectedValue(new Error());

      await expect(service.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
