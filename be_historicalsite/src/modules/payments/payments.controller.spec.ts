import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PaymentType, PaymentStatus, CreatePaymentDto } from './dto/create-payment.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UpdatePaymentDto } from './dto/update-payment.dto';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: PaymentsService;

  // Mock PaymentsService
  const mockPaymentsService = {
    create: jest.fn().mockResolvedValue({ url: 'https://checkout.stripe.com/test-session' }),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
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
    it('should update a payment', async () => {
      const paymentId = 'test-id-1';
      const updatePaymentDto: UpdatePaymentDto = {
        status: PaymentStatus.COMPLETED,
      };
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
      
      mockPaymentsService.update.mockResolvedValue(updatedPayment);
      
      expect(await controller.update(paymentId, updatePaymentDto)).toEqual(updatedPayment);
      expect(service.update).toHaveBeenCalledWith(paymentId, updatePaymentDto);
    });
    
    it('should throw NotFoundException when payment to update is not found', async () => {
      const paymentId = 'non-existent-id';
      const updatePaymentDto: UpdatePaymentDto = {
        status: PaymentStatus.COMPLETED,
      };
      
      mockPaymentsService.update.mockRejectedValue(new NotFoundException(`Payment with ID ${paymentId} not found`));
      
      await expect(controller.update(paymentId, updatePaymentDto)).rejects.toThrow(NotFoundException);
      expect(service.update).toHaveBeenCalledWith(paymentId, updatePaymentDto);
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
  

  //   it('should create a new payment', async () => {
  //     const createPaymentDto = {
  //       userEmail: 'test@example.com',
  //       quantity: 2,
  //       paymentType: PaymentType.DEBIT_CARD,
  //       status: PaymentStatus.PENDING,
  //       bookingDate: new Date(),
  //       totalPrice: '99.99'
  //     };

  //     const expectedResult = {
  //       paymentId: uuidv4(),
  //       ...createPaymentDto,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     };

  //     jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

  //     const result = await controller.create(createPaymentDto);

  //     expect(result).toEqual(expectedResult);
  //     expect(service.create).toHaveBeenCalledWith(createPaymentDto);
  //   });
  // });

  // describe('findAll', () => {
  //   it('should return an array of payments', async () => {
  //     const expectedResult = [
  //       {
  //         paymentId: uuidv4(),
  //         userEmail: 'test@example.com',
  //         quantity: 2,
  //         paymentType: PaymentType.DEBIT_CARD,
  //         status: PaymentStatus.PENDING,
  //         bookingDate: new Date(),
  //         totalPrice: '99.99',
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //       },
  //     ];

  //     jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

  //     const result = await controller.findAll();

  //     expect(result).toEqual(expectedResult);
  //     expect(service.findAll).toHaveBeenCalled();
  //   });
  // });

  // describe('findOne', () => {
  //   it('should return a payment by id', async () => {
  //     const paymentId = uuidv4();
  //     const expectedResult = {
  //       paymentId,
  //       userEmail: 'test@example.com',
  //       quantity: 2,
  //       paymentType: 'DEBIT_CARD',
  //       status: 'PENDING',
  //       bookingDate: new Date(),
  //       totalPrice: '99.99',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     };

  //     jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

  //     const result = await controller.findOne(paymentId);

  //     expect(result).toEqual(expectedResult);
  //     expect(service.findOne).toHaveBeenCalledWith(paymentId);
  //   });

  //   it('should throw NotFoundException when payment is not found', async () => {
  //     const paymentId = uuidv4();
  //     jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException(`Payment with ID ${paymentId} not found`));

  //     await expect(controller.findOne(paymentId)).rejects.toThrow(NotFoundException);
  //     expect(service.findOne).toHaveBeenCalledWith(paymentId);
  //   });
  // });

  // describe('update', () => {
  //   it('should update a payment', async () => {
  //     const paymentId = uuidv4();
  //     const updatePaymentDto = {
  //       status: 'COMPLETED',
  //     };

  //     const expectedResult = {
  //       paymentId,
  //       userEmail: 'test@example.com',
  //       quantity: 2,
  //       paymentType: PaymentType.DEBIT_CARD,
  //       status: PaymentStatus.COMPLETED,
  //       bookingDate: new Date(),
  //       totalPrice: '99.99',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     };

  //     jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

  //     const result = await controller.update(paymentId, updatePaymentDto);

  //     expect(result).toEqual(expectedResult);
  //     expect(service.update).toHaveBeenCalledWith(paymentId, updatePaymentDto);
  //   });

  //   it('should throw NotFoundException when payment to update is not found', async () => {
  //     const paymentId = uuidv4();
  //     const updatePaymentDto = {
  //       status: 'COMPLETED',
  //     };

  //     jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException(`Payment with ID ${paymentId} not found`));

  //     await expect(controller.update(paymentId, updatePaymentDto)).rejects.toThrow(NotFoundException);
  //     expect(service.update).toHaveBeenCalledWith(paymentId, updatePaymentDto);
  //   });
  // });

  // describe('remove', () => {
  //   it('should remove a payment', async () => {
  //     const paymentId = uuidv4();
  //     const expectedResult = {
  //       paymentId,
  //       userEmail: 'test@example.com',
  //       quantity: 2,
  //       paymentType: 'DEBIT_CARD',
  //       status: 'PENDING',
  //       bookingDate: new Date(),
  //       totalPrice: '99.99',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     };

  //     jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

  //     const result = await controller.remove(paymentId);

  //     expect(result).toEqual(expectedResult);
  //     expect(service.remove).toHaveBeenCalledWith(paymentId);
  //   });

  //   it('should throw NotFoundException when payment to remove is not found', async () => {
  //     const paymentId = uuidv4();
  //     jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException(`Payment with ID ${paymentId} not found`));

  //     await expect(controller.remove(paymentId)).rejects.toThrow(NotFoundException);
  //     expect(service.remove).toHaveBeenCalledWith(paymentId);
  //   });
  // });
});
