// Define interfaces and enums for the booking feature

// Define interfaces to match our Prisma schema
export interface Museum {
  museumId: string;
  museumName: string;
  museumImage: string;
  museumAddress: string;
  museumPhone: string;
  museumEmail: string;
  createdAt?: string;
  updatedAt?: string;
}

// Define enums to match our Prisma schema
export enum PaymentType {
  DEBIT_CARD = 'DEBIT_CARD',
  CREDIT_CARD = 'CREDIT_CARD',
  CASH = 'CASH'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

// Define the payment data interface
export interface PaymentData {
  userEmail: string;
  quantity: number;
  paymentType: PaymentType;
  status: PaymentStatus;
  bookingDate: string; // ISO string format
  totalPrice: number;
  museumId: string;
}
