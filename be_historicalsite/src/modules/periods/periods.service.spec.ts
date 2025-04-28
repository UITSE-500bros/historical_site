import { Test, TestingModule } from '@nestjs/testing';
import { PeriodsService } from './periods.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

describe('PeriodsService', () => {
  let service: PeriodsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    period: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeriodsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PeriodsService>(PeriodsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
        periodId: expect.any(String),
        ...createPeriodDto,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };

      mockPrismaService.period.create.mockResolvedValue(expectedPeriod);

      const result = await service.create(createPeriodDto);

      expect(result).toEqual(expectedPeriod);
      expect(mockPrismaService.period.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          periodId: expect.any(String),
          ...createPeriodDto,
        }),
      });
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

      mockPrismaService.period.findMany.mockResolvedValue(expectedPeriods);

      const result = await service.findAll();

      expect(result).toEqual(expectedPeriods);
      expect(mockPrismaService.period.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a period if found', async () => {
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

      mockPrismaService.period.findUnique.mockResolvedValue(expectedPeriod);

      const result = await service.findOne(periodId);

      expect(result).toEqual(expectedPeriod);
      expect(mockPrismaService.period.findUnique).toHaveBeenCalledWith({
        where: { periodId },
      });
    });

    it('should throw NotFoundException if period not found', async () => {
      const periodId = uuidv4();
      mockPrismaService.period.findUnique.mockResolvedValue(null);

      await expect(service.findOne(periodId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a period if found', async () => {
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

      mockPrismaService.period.update.mockResolvedValue(expectedPeriod);

      const result = await service.update(periodId, updatePeriodDto);

      expect(result).toEqual(expectedPeriod);
      expect(mockPrismaService.period.update).toHaveBeenCalledWith({
        where: { periodId },
        data: updatePeriodDto,
      });
    });

    it('should throw NotFoundException if period not found', async () => {
      const periodId = uuidv4();
      mockPrismaService.period.update.mockRejectedValue(new Error());

      await expect(service.update(periodId, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a period if found', async () => {
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

      mockPrismaService.period.delete.mockResolvedValue(expectedPeriod);

      const result = await service.remove(periodId);

      expect(result).toEqual(expectedPeriod);
      expect(mockPrismaService.period.delete).toHaveBeenCalledWith({
        where: { periodId },
      });
    });

    it('should throw NotFoundException if period not found', async () => {
      const periodId = uuidv4();
      mockPrismaService.period.delete.mockRejectedValue(new Error());

      await expect(service.remove(periodId)).rejects.toThrow(NotFoundException);
    });
  });
});
