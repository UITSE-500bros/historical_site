import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: PaymentsService;

  const mockPaymentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockPayment = {
    payment_id: '123e4567-e89b-12d3-a456-426614174000',
    amount: 100,
    currency: 'USD',
    status: 'Completed',
    payment_method: 'Credit Card',
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: PaymentsService,
          useValue: mockPaymentsService,
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    service = module.get<PaymentsService>(PaymentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new payment', async () => {
      const createPaymentDto: CreatePaymentDto = {
        amount: 100,
        currency: 'USD',
        payment_method: 'Credit Card',
      };
      mockPaymentsService.create.mockResolvedValue(mockPayment);

      const result = await controller.create(createPaymentDto);

      expect(service.create).toHaveBeenCalledWith(createPaymentDto);
      expect(result).toEqual(mockPayment);
    });
  });

  describe('findAll', () => {
    it('should return an array of payments', async () => {
      mockPaymentsService.findAll.mockResolvedValue([mockPayment]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockPayment]);
    });
  });

  describe('findOne', () => {
    it('should return a payment by id', async () => {
      mockPaymentsService.findOne.mockResolvedValue(mockPayment);

      const result = await controller.findOne(mockPayment.payment_id);

      expect(service.findOne).toHaveBeenCalledWith(mockPayment.payment_id);
      expect(result).toEqual(mockPayment);
    });
  });

  describe('update', () => {
    it('should update a payment', async () => {
      const updatePaymentDto: UpdatePaymentDto = { status: 'Refunded' };
      const updatedPayment = {
        ...mockPayment,
        status: 'Refunded',
      };
      mockPaymentsService.update.mockResolvedValue(updatedPayment);

      const result = await controller.update(mockPayment.payment_id, updatePaymentDto);

      expect(service.update).toHaveBeenCalledWith(mockPayment.payment_id, updatePaymentDto);
      expect(result).toEqual(updatedPayment);
    });
  });

  describe('remove', () => {
    it('should remove a payment', async () => {
      mockPaymentsService.remove.mockResolvedValue(mockPayment);

      const result = await controller.remove(mockPayment.payment_id);

      expect(service.remove).toHaveBeenCalledWith(mockPayment.payment_id);
      expect(result).toEqual(mockPayment);
    });
  });
});
