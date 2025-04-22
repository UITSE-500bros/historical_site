import { Test, TestingModule } from '@nestjs/testing';
import { PeriodsService } from './periods.service';
import { NotFoundException } from '@nestjs/common';
import { prismaClient } from '../../prisma/prisma.service';

// Mock the Prisma client
jest.mock('../../prisma/prisma.service', () => ({
  prismaClient: {
    period: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('PeriodsService', () => {
  let service: PeriodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeriodsService],
    }).compile();

    service = module.get<PeriodsService>(PeriodsService);
    
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new period', async () => {
      const createPeriodDto = {
        periodName: 'Renaissance',
        startYear: 1300,
        endYear: 1600,
      };
      
      const expectedPeriod = {
        periodId: '123e4567-e89b-12d3-a456-426614174000',
        periodName: 'Renaissance',
        startYear: 1300,
        endYear: 1600,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      jest.spyOn(prismaClient.period, 'create').mockResolvedValue(expectedPeriod);
      
      const result = await service.create(createPeriodDto);
      
      expect(prismaClient.period.create).toHaveBeenCalledWith({
        data: {
          periodName: createPeriodDto.periodName,
          startYear: createPeriodDto.startYear,
          endYear: createPeriodDto.endYear,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      });
      
      expect(result).toEqual(expectedPeriod);
    });
  });

  describe('findAll', () => {
    it('should return an array of periods', async () => {
      const expectedPeriods = [
        {
          periodId: '123e4567-e89b-12d3-a456-426614174000',
          periodName: 'Renaissance',
          startYear: 1300,
          endYear: 1600,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          periodId: '987fcdeb-51a2-43d7-9b56-254415f67890',
          periodName: 'Medieval',
          startYear: 500,
          endYear: 1500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      
      jest.spyOn(prismaClient.period, 'findMany').mockResolvedValue(expectedPeriods);
      
      const result = await service.findAll();
      
      expect(prismaClient.period.findMany).toHaveBeenCalled();
      expect(result).toEqual(expectedPeriods);
    });
  });

  describe('findOne', () => {
    it('should return a period by id', async () => {
      const periodId = '123e4567-e89b-12d3-a456-426614174000';
      const expectedPeriod = {
        periodId,
        periodName: 'Renaissance',
        startYear: 1300,
        endYear: 1600,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      jest.spyOn(prismaClient.period, 'findUnique').mockResolvedValue(expectedPeriod);
      
      const result = await service.findOne(periodId);
      
      expect(prismaClient.period.findUnique).toHaveBeenCalledWith({
        where: { periodId },
      });
      expect(result).toEqual(expectedPeriod);
    });

    it('should throw NotFoundException when period is not found', async () => {
      const periodId = '123e4567-e89b-12d3-a456-426614174000';
      
      jest.spyOn(prismaClient.period, 'findUnique').mockResolvedValue(null);
      
      await expect(service.findOne(periodId)).rejects.toThrow(NotFoundException);
      expect(prismaClient.period.findUnique).toHaveBeenCalledWith({
        where: { periodId },
      });
    });
  });

  describe('update', () => {
    it('should update a period', async () => {
      const periodId = '123e4567-e89b-12d3-a456-426614174000';
      const updatePeriodDto = {
        periodName: 'Updated Renaissance',
        startYear: 1350,
      };
      
      const existingPeriod = {
        periodId,
        periodName: 'Renaissance',
        startYear: 1300,
        endYear: 1600,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const expectedUpdatedPeriod = {
        ...existingPeriod,
        periodName: 'Updated Renaissance',
        startYear: 1350,
        updatedAt: new Date(),
      };
      
      jest.spyOn(prismaClient.period, 'findUnique').mockResolvedValue(existingPeriod);
      jest.spyOn(prismaClient.period, 'update').mockResolvedValue(expectedUpdatedPeriod);
      
      const result = await service.update(periodId, updatePeriodDto);
      
      expect(prismaClient.period.findUnique).toHaveBeenCalledWith({
        where: { periodId },
      });
      expect(prismaClient.period.update).toHaveBeenCalledWith({
        where: { periodId },
        data: {
          periodName: updatePeriodDto.periodName,
          startYear: updatePeriodDto.startYear,
          updatedAt: expect.any(Date),
        },
      });
      expect(result).toEqual(expectedUpdatedPeriod);
    });

    it('should throw NotFoundException when period to update is not found', async () => {
      const periodId = '123e4567-e89b-12d3-a456-426614174000';
      const updatePeriodDto = {
        periodName: 'Updated Renaissance',
      };
      
      jest.spyOn(prismaClient.period, 'findUnique').mockResolvedValue(null);
      
      await expect(service.update(periodId, updatePeriodDto)).rejects.toThrow(NotFoundException);
      expect(prismaClient.period.findUnique).toHaveBeenCalledWith({
        where: { periodId },
      });
      expect(prismaClient.period.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a period', async () => {
      const periodId = '123e4567-e89b-12d3-a456-426614174000';
      const expectedPeriod = {
        periodId,
        periodName: 'Renaissance',
        startYear: 1300,
        endYear: 1600,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      jest.spyOn(prismaClient.period, 'findUnique').mockResolvedValue(expectedPeriod);
      jest.spyOn(prismaClient.period, 'delete').mockResolvedValue(expectedPeriod);
      
      const result = await service.remove(periodId);
      
      expect(prismaClient.period.findUnique).toHaveBeenCalledWith({
        where: { periodId },
      });
      expect(prismaClient.period.delete).toHaveBeenCalledWith({
        where: { periodId },
      });
      expect(result).toEqual(expectedPeriod);
    });

    it('should throw NotFoundException when period to remove is not found', async () => {
      const periodId = '123e4567-e89b-12d3-a456-426614174000';
      
      jest.spyOn(prismaClient.period, 'findUnique').mockResolvedValue(null);
      
      await expect(service.remove(periodId)).rejects.toThrow(NotFoundException);
      expect(prismaClient.period.findUnique).toHaveBeenCalledWith({
        where: { periodId },
      });
      expect(prismaClient.period.delete).not.toHaveBeenCalled();
    });
  });
});
