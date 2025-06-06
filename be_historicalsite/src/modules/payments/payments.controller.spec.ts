import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PaymentType, PaymentStatus, CreatePaymentDto } from './dto/create-payment.dto';
import { MailerService } from '@nestjs-modules/mailer';
// UpdatePaymentDto is no longer needed for the tests
// import { UpdatePaymentDto } from './dto/update-payment.dto';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: PaymentsService;

  // Mock PaymentsService
  const mockPaymentsService = {
    create: jest.fn().mockResolvedValue({ url: 'https://checkout.stripe.com/test-session' }),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    updatePaymentStatus: jest.fn(),
    remove: jest.fn(),
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
    
    // Reset all mocks before each test
    jest.clearAllMocks();
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
        userEmail: 'test@example.com',
        quantity: 2,
        totalPrice: 200,
        paymentType: PaymentType.DEBIT_CARD,
        status: PaymentStatus.PENDING,
        bookingDate: new Date(),
        museumId: 'test-museum-id',
      };
      
      const result = await controller.create(createPaymentDto);
      
      expect(result).toEqual({ url: 'https://checkout.stripe.com/test-session' });
      expect(service.create).toHaveBeenCalledWith(createPaymentDto);
    });
  });
  
  describe('findAll', () => {
    it('should return an array of payments', async () => {
      const payments = [
        {
          paymentId: 'test-id-1',
          userEmail: 'test1@example.com',
          quantity: 1,
          totalPrice: 100,
          paymentType: PaymentType.DEBIT_CARD,
          status: PaymentStatus.COMPLETED,
          bookingDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          paymentId: 'test-id-2',
          userEmail: 'test2@example.com',
          quantity: 2,
          totalPrice: 200,
          paymentType: PaymentType.DIGITAL_WALLET,
          status: PaymentStatus.PENDING,
          bookingDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      
      mockPaymentsService.findAll.mockResolvedValue(payments);
      
      expect(await controller.findAll()).toEqual(payments);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
  
  describe('findOne', () => {
    it('should return a payment by ID', async () => {
      const paymentId = 'test-id-1';
      const payment = {
        paymentId,
        userEmail: 'test@example.com',
        quantity: 1,
        totalPrice: 100,
        paymentType: PaymentType.DEBIT_CARD,
        status: PaymentStatus.COMPLETED,
        bookingDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      mockPaymentsService.findOne.mockResolvedValue(payment);
      
      expect(await controller.findOne(paymentId)).toEqual(payment);
      expect(service.findOne).toHaveBeenCalledWith(paymentId);
    });
    
    it('should throw NotFoundException when payment is not found', async () => {
      const paymentId = 'non-existent-id';
      
      mockPaymentsService.findOne.mockRejectedValue(new NotFoundException(`Payment with ID ${paymentId} not found`));
      
      await expect(controller.findOne(paymentId)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(paymentId);
    });
  });
  
  describe('update', () => {
    it('should update a payment status', async () => {
      const paymentId = 'test-id-1';
      const status = PaymentStatus.COMPLETED;
      const updatedPayment = {
        paymentId,
        userEmail: 'test@example.com',
        quantity: 1,
        totalPrice: 100,
        paymentType: PaymentType.DEBIT_CARD,
        status: PaymentStatus.COMPLETED,
        bookingDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      mockPaymentsService.updatePaymentStatus.mockResolvedValue(updatedPayment);
      
      expect(await controller.update(paymentId, status)).toEqual(updatedPayment);
      expect(service.updatePaymentStatus).toHaveBeenCalledWith(paymentId, status);
    });
    
    it('should throw NotFoundException when payment to update is not found', async () => {
      const paymentId = 'non-existent-id';
      const status = PaymentStatus.COMPLETED;
      
      mockPaymentsService.updatePaymentStatus.mockRejectedValue(new NotFoundException(`Payment with ID ${paymentId} not found`));
      
      await expect(controller.update(paymentId, status)).rejects.toThrow(NotFoundException);
      expect(service.updatePaymentStatus).toHaveBeenCalledWith(paymentId, status);
    });
  });
  
  describe('remove', () => {
    it('should remove a payment', async () => {
      const paymentId = 'test-id-1';
      
      mockPaymentsService.remove.mockResolvedValue({ success: true });
      
      expect(await controller.remove(paymentId)).toEqual({ success: true });
      expect(service.remove).toHaveBeenCalledWith(paymentId);
    });
    
    it('should throw NotFoundException when payment to remove is not found', async () => {
      const paymentId = 'non-existent-id';
      
      mockPaymentsService.remove.mockRejectedValue(new NotFoundException(`Payment with ID ${paymentId} not found`));
      
      await expect(controller.remove(paymentId)).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledWith(paymentId);
    });
  });
});
