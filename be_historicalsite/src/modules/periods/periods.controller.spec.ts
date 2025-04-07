import { Test, TestingModule } from '@nestjs/testing';
import { PeriodsController } from './periods.controller';
import { PeriodsService } from './periods.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';

describe('PeriodsController', () => {
  let controller: PeriodsController;
  let service: PeriodsService;

  const mockPeriodsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockPeriod = {
    period_id: '123e4567-e89b-12d3-a456-426614174000',
    period_name: 'Renaissance',
    start_year: 1300,
    end_year: 1600,
    created_at: new Date(),
    updated_at: new Date(),
    articles: [],
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new period', async () => {
      const createPeriodDto: CreatePeriodDto = {
        period_name: 'Renaissance',
        start_year: 1300,
        end_year: 1600,
      };
      mockPeriodsService.create.mockResolvedValue(mockPeriod);

      const result = await controller.create(createPeriodDto);

      expect(service.create).toHaveBeenCalledWith(createPeriodDto);
      expect(result).toEqual(mockPeriod);
    });
  });

  describe('findAll', () => {
    it('should return an array of periods', async () => {
      mockPeriodsService.findAll.mockResolvedValue([mockPeriod]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockPeriod]);
    });
  });

  describe('findOne', () => {
    it('should return a period by id', async () => {
      mockPeriodsService.findOne.mockResolvedValue(mockPeriod);

      const result = await controller.findOne(mockPeriod.period_id);

      expect(service.findOne).toHaveBeenCalledWith(mockPeriod.period_id);
      expect(result).toEqual(mockPeriod);
    });
  });

  describe('update', () => {
    it('should update a period', async () => {
      const updatePeriodDto: UpdatePeriodDto = { period_name: 'Updated Period' };
      const updatedPeriod = {
        ...mockPeriod,
        period_name: 'Updated Period',
      };
      mockPeriodsService.update.mockResolvedValue(updatedPeriod);

      const result = await controller.update(mockPeriod.period_id, updatePeriodDto);

      expect(service.update).toHaveBeenCalledWith(mockPeriod.period_id, updatePeriodDto);
      expect(result).toEqual(updatedPeriod);
    });
  });

  describe('remove', () => {
    it('should remove a period', async () => {
      mockPeriodsService.remove.mockResolvedValue(mockPeriod);

      const result = await controller.remove(mockPeriod.period_id);

      expect(service.remove).toHaveBeenCalledWith(mockPeriod.period_id);
      expect(result).toEqual(mockPeriod);
    });
  });
});
