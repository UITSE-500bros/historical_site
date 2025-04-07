import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';

describe('PeriodsService', () => {
  let service: PeriodsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    periods: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockPeriod = {
    period_id: '123e4567-e89b-12d3-a456-426614174000',
    period_name: 'Renaissance',
    start_year: BigInt(1300),
    end_year: BigInt(1600),
    created_at: new Date(),
    updated_at: new Date(),
    articles: [],
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
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new period', async () => {
      const createPeriodDto: CreatePeriodDto = { 
        period_name: 'Renaissance',
        start_year: 1300,
        end_year: 1600
      };
      mockPrismaService.periods.create.mockResolvedValue(mockPeriod);

      const result = await service.create(createPeriodDto);

      expect(mockPrismaService.periods.create).toHaveBeenCalledWith({
        data: {
          period_name: createPeriodDto.period_name,
          start_year: BigInt(createPeriodDto.start_year),
          end_year: BigInt(createPeriodDto.end_year),
        },
      });
      expect(result).toEqual(mockPeriod);
    });
  });

  describe('findAll', () => {
    it('should return an array of periods with converted BigInt values', async () => {
      mockPrismaService.periods.findMany.mockResolvedValue([mockPeriod]);

      const result = await service.findAll();

      expect(mockPrismaService.periods.findMany).toHaveBeenCalled();
      expect(result).toEqual([{
        ...mockPeriod,
        start_year: Number(mockPeriod.start_year),
        end_year: Number(mockPeriod.end_year),
      }]);
    });
  });

  describe('findOne', () => {
    it('should return a period by id with converted BigInt values', async () => {
      mockPrismaService.periods.findUnique.mockResolvedValue(mockPeriod);

      const result = await service.findOne(mockPeriod.period_id);

      expect(mockPrismaService.periods.findUnique).toHaveBeenCalledWith({
        where: { period_id: mockPeriod.period_id },
        include: { articles: true },
      });
      expect(result).toEqual({
        ...mockPeriod,
        start_year: Number(mockPeriod.start_year),
        end_year: Number(mockPeriod.end_year),
      });
    });

    it('should throw NotFoundException if period not found', async () => {
      mockPrismaService.periods.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a period', async () => {
      const updatePeriodDto: UpdatePeriodDto = { period_name: 'Updated Period' };
      const updatedPeriod = {
        ...mockPeriod,
        period_name: 'Updated Period',
      };
      mockPrismaService.periods.update.mockResolvedValue(updatedPeriod);

      const result = await service.update(mockPeriod.period_id, updatePeriodDto);

      expect(mockPrismaService.periods.update).toHaveBeenCalledWith({
        where: { period_id: mockPeriod.period_id },
        data: updatePeriodDto,
      });
      expect(result).toEqual({
        ...updatedPeriod,
        start_year: Number(updatedPeriod.start_year),
        end_year: Number(updatedPeriod.end_year),
      });
    });

    it('should update start_year and end_year with BigInt conversion', async () => {
      const updatePeriodDto: UpdatePeriodDto = { 
        start_year: 1400,
        end_year: 1700
      };
      const updatedPeriod = {
        ...mockPeriod,
        start_year: BigInt(1400),
        end_year: BigInt(1700),
      };
      mockPrismaService.periods.update.mockResolvedValue(updatedPeriod);

      await service.update(mockPeriod.period_id, updatePeriodDto);

      expect(mockPrismaService.periods.update).toHaveBeenCalledWith({
        where: { period_id: mockPeriod.period_id },
        data: expect.objectContaining({
          start_year: BigInt(1400),
          end_year: BigInt(1700),
        }),
      });
    });

    it('should throw NotFoundException if period to update not found', async () => {
      const updatePeriodDto: UpdatePeriodDto = { period_name: 'Updated Period' };
      mockPrismaService.periods.update.mockRejectedValue(new Error());

      await expect(
        service.update('non-existent-id', updatePeriodDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a period', async () => {
      mockPrismaService.periods.delete.mockResolvedValue(mockPeriod);

      const result = await service.remove(mockPeriod.period_id);

      expect(mockPrismaService.periods.delete).toHaveBeenCalledWith({
        where: { period_id: mockPeriod.period_id },
      });
      expect(result).toEqual({
        ...mockPeriod,
        start_year: Number(mockPeriod.start_year),
        end_year: Number(mockPeriod.end_year),
      });
    });

    it('should throw NotFoundException if period to remove not found', async () => {
      mockPrismaService.periods.delete.mockRejectedValue(new Error());

      await expect(service.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
