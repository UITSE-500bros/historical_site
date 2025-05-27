import { Test, TestingModule } from '@nestjs/testing';
import { CreatePaymentDto, PaymentStatus, PaymentType } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  let service: PaymentsService;

  // Mock PrismaService
  const mockPrismaService = {
    payment: {
      create: jest.fn().mockResolvedValue({
        paymentId: 'test-payment-id',
        userEmail: 'test@example.com',
        quantity: 1,
        totalPrice: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }
  };
  
  // Mock MailerService
  const mockMailerService = {
    sendMail: jest.fn().mockResolvedValue(true),
  };
  
  // Mock Stripe
  const mockStripe = {
    checkout: {
      sessions: {
        create: jest.fn().mockResolvedValue({
          url: 'https://checkout.stripe.com/test-session'
        }),
      },
    },
  };

  beforeEach(async () => {
    // Set environment variables for testing
    process.env.STRIPE_SECRET_KEY = 'test_stripe_key';
    process.env.FRONTEND_URL = 'http://localhost:3000';
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PaymentsService,
          useFactory: () => {
            // Create a service instance with our mocks
            const service = new PaymentsService(mockPrismaService as any, mockMailerService as any);
            // Replace the Stripe instance with our mock
            Object.defineProperty(service, 'stripe', {
              value: mockStripe,
              writable: true,
            });
            return service;
          },
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  describe('create', () => {
    it('should create a payment and return the checkout URL', async () => {
      const createPaymentDto: CreatePaymentDto = {
        userEmail: 'test@example.com',
        quantity: 1,
        totalPrice: 100,
        paymentType: PaymentType.DEBIT_CARD,
        status: PaymentStatus.PENDING,
        bookingDate: new Date(),
      };
      
      const result = await service.create(createPaymentDto);
      
      expect(result).toEqual({ url: 'https://checkout.stripe.com/test-session' });
      expect(mockStripe.checkout.sessions.create).toHaveBeenCalled();
      expect(mockPrismaService.payment.create).toHaveBeenCalled();
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
      
      mockPrismaService.payment.findMany.mockResolvedValue(payments);
      
      expect(await service.findAll()).toEqual(payments);
      expect(mockPrismaService.payment.findMany).toHaveBeenCalled();
    });
  });
});
