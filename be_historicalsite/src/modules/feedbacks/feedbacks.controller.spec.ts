import { Test, TestingModule } from '@nestjs/testing';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new feedback', async () => {
      const createFeedbackDto: CreateFeedbackDto = {
        user_email: 'user@example.com',
        subject: 'Suggestion',
        message: 'I have a suggestion for the site',
      };
      mockFeedbacksService.create.mockResolvedValue(mockFeedback);

      const result = await controller.create(createFeedbackDto);

      expect(service.create).toHaveBeenCalledWith(createFeedbackDto);
      expect(result).toEqual(mockFeedback);
    });
  });

  describe('findAll', () => {
    it('should return an array of feedbacks', async () => {
      mockFeedbacksService.findAll.mockResolvedValue([mockFeedback]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockFeedback]);
    });
  });

  describe('findOne', () => {
    it('should return a feedback by id', async () => {
      mockFeedbacksService.findOne.mockResolvedValue(mockFeedback);

      const result = await controller.findOne(mockFeedback.feedback_id);

      expect(service.findOne).toHaveBeenCalledWith(mockFeedback.feedback_id);
      expect(result).toEqual(mockFeedback);
    });
  });

  describe('update', () => {
    it('should update a feedback', async () => {
      const updateFeedbackDto: UpdateFeedbackDto = { status: 'Resolved' };
      const updatedFeedback = {
        ...mockFeedback,
        status: 'Resolved',
      };
      mockFeedbacksService.update.mockResolvedValue(updatedFeedback);

      const result = await controller.update(mockFeedback.feedback_id, updateFeedbackDto);

      expect(service.update).toHaveBeenCalledWith(mockFeedback.feedback_id, updateFeedbackDto);
      expect(result).toEqual(updatedFeedback);
    });
  });

  describe('remove', () => {
    it('should remove a feedback', async () => {
      mockFeedbacksService.remove.mockResolvedValue(mockFeedback);

      const result = await controller.remove(mockFeedback.feedback_id);

      expect(service.remove).toHaveBeenCalledWith(mockFeedback.feedback_id);
      expect(result).toEqual(mockFeedback);
    });
  });
});
