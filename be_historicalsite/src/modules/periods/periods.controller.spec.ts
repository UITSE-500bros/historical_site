import { Test, TestingModule } from '@nestjs/testing';
import { PeriodsController } from './periods.controller';
import { PeriodsService } from './periods.service';
import { NotFoundException } from '@nestjs/common';

describe('PeriodsController', () => {
  let controller: PeriodsController;
  let service: PeriodsService;

  // Mock data
  const mockPeriod = {
    periodId: '123e4567-e89b-12d3-a456-426614174000',
    periodName: 'Renaissance',
    startYear: 1300,
    endYear: 1600,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPeriods = [
    mockPeriod,
    {
      periodId: '987fcdeb-51a2-43d7-9b56-254415f67890',
      periodName: 'Medieval',
      startYear: 500,
      endYear: 1500,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Mock service
  const mockPeriodsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodsController],
      providers: [
        {
          provide: PeriodsService,
          useValue: mockPeriodsService,
        },
      ],
    }).compile();

    controller = module.get<PeriodsController>(PeriodsController);
    service = module.get<PeriodsService>(PeriodsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a period', async () => {
      const createPeriodDto = {
        periodName: 'Renaissance',
        startYear: 1300,
        endYear: 1600,
      };

      mockPeriodsService.create.mockResolvedValue(mockPeriod);

      const result = await controller.create(createPeriodDto);

      expect(service.create).toHaveBeenCalledWith(createPeriodDto);
      expect(result).toEqual(mockPeriod);
    });
  });

  describe('findAll', () => {
    it('should return an array of periods', async () => {
      mockPeriodsService.findAll.mockResolvedValue(mockPeriods);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockPeriods);
    });
  });

  describe('findOne', () => {
    it('should return a period by id', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      mockPeriodsService.findOne.mockResolvedValue(mockPeriod);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockPeriod);
    });

    it('should throw NotFoundException when period is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      mockPeriodsService.findOne.mockRejectedValue(new NotFoundException(`Period with ID ${id} not found`));

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a period', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const updatePeriodDto = {
        periodName: 'Updated Renaissance',
        startYear: 1350,
      };

      const updatedPeriod = {
        ...mockPeriod,
        periodName: 'Updated Renaissance',
        startYear: 1350,
        updatedAt: new Date(),
      };

      mockPeriodsService.update.mockResolvedValue(updatedPeriod);

      const result = await controller.update(id, updatePeriodDto);

      expect(service.update).toHaveBeenCalledWith(id, updatePeriodDto);
      expect(result).toEqual(updatedPeriod);
    });

    it('should throw NotFoundException when period to update is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const updatePeriodDto = {
        periodName: 'Updated Renaissance',
      };

      mockPeriodsService.update.mockRejectedValue(new NotFoundException(`Period with ID ${id} not found`));

      await expect(controller.update(id, updatePeriodDto)).rejects.toThrow(NotFoundException);
      expect(service.update).toHaveBeenCalledWith(id, updatePeriodDto);
    });
  });

  describe('remove', () => {
    it('should remove a period', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      mockPeriodsService.remove.mockResolvedValue(mockPeriod);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockPeriod);
    });

    it('should throw NotFoundException when period to remove is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      mockPeriodsService.remove.mockRejectedValue(new NotFoundException(`Period with ID ${id} not found`));

      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
