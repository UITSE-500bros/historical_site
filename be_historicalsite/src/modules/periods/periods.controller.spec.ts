import { Test, TestingModule } from '@nestjs/testing';
import { PeriodsController } from './periods.controller';
import { PeriodsService } from './periods.service';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

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
        periodName: 'Test Period',
        periodImage: 'test.jpg',
        startYear: 1900,
        endYear: 2000,
      };

      const expectedPeriod = {
        periodId: uuidv4(),
        ...createPeriodDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPeriodsService.create.mockResolvedValue(expectedPeriod);

      const result = await controller.create(createPeriodDto);

      expect(result).toEqual(expectedPeriod);
      expect(mockPeriodsService.create).toHaveBeenCalledWith(createPeriodDto);
    });
  });

  describe('findAll', () => {
    it('should return all periods', async () => {
      const expectedPeriods = [
        {
          periodId: uuidv4(),
          periodName: 'Test Period',
          periodImage: 'test.jpg',
          startYear: 1900,
          endYear: 2000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPeriodsService.findAll.mockResolvedValue(expectedPeriods);

      const result = await controller.findAll();

      expect(result).toEqual(expectedPeriods);
      expect(mockPeriodsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a period by id', async () => {
      const periodId = uuidv4();
      const expectedPeriod = {
        periodId,
        periodName: 'Test Period',
        periodImage: 'test.jpg',
        startYear: 1900,
        endYear: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPeriodsService.findOne.mockResolvedValue(expectedPeriod);

      const result = await controller.findOne(periodId);

      expect(result).toEqual(expectedPeriod);
      expect(mockPeriodsService.findOne).toHaveBeenCalledWith(periodId);
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
      const periodId = uuidv4();
      const updatePeriodDto = {
        periodName: 'Updated Period',
      };

      const expectedPeriod = {
        periodId,
        periodName: 'Updated Period',
        periodImage: 'test.jpg',
        startYear: 1900,
        endYear: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPeriodsService.update.mockResolvedValue(expectedPeriod);

      const result = await controller.update(periodId, updatePeriodDto);

      expect(result).toEqual(expectedPeriod);
      expect(mockPeriodsService.update).toHaveBeenCalledWith(periodId, updatePeriodDto);
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
      const periodId = uuidv4();
      const expectedPeriod = {
        periodId,
        periodName: 'Test Period',
        periodImage: 'test.jpg',
        startYear: 1900,
        endYear: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPeriodsService.remove.mockResolvedValue(expectedPeriod);

      const result = await controller.remove(periodId);

      expect(result).toEqual(expectedPeriod);
      expect(mockPeriodsService.remove).toHaveBeenCalledWith(periodId);
    });

    it('should throw NotFoundException when period to remove is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      mockPeriodsService.remove.mockRejectedValue(new NotFoundException(`Period with ID ${id} not found`));

      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
