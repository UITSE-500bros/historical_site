import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PaymentType, PaymentStatus } from './dto/create-payment.dto';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: PaymentsService;

  // Mock PrismaService
  const mockPrismaService = {
    payment: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        PaymentsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    service = module.get<PaymentsService>(PaymentsService);
    
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('create', () => {
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
