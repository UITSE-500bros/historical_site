import { Museum, PaymentData, PaymentStatus, PaymentType } from '../types';

/**
 * Fetch all museums from the API
 */

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888';

// Define additional types for payment handling
export interface PaymentResponse {
  url: string;
  sessionId: string;
  status: 'created' | 'pending' | 'succeeded' | 'failed' | 'canceled';
}

export class PaymentError extends Error {
  constructor(
    public message: string,
    public statusCode?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'PaymentError';
  }
}

export async function fetchMuseums(): Promise<Museum[]> {
  const response = await fetch(`${API_BASE_URL}/museums`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch museums');
  }
  
  return response.json();
}
export async function createPayment(paymentData: PaymentData): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    console.log('Payment response:', response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new PaymentError(
        errorData?.message ?? 'Failed to create payment',
        response.status,
        errorData
      );
    }
    
    const result = await response.json();
    console.log('Payment created successfully:', result);
    return result;
  } catch (error) {
    if (error instanceof PaymentError) {
      throw error;
    }
    throw new PaymentError(
      error instanceof Error ? error.message : 'Unknown payment error',
      500
    );
  }
}

// Function to verify payment status
export async function checkPaymentStatus(sessionId: string): Promise<PaymentResponse> {
  const response = await fetch(`${API_BASE_URL}/payments/${sessionId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new PaymentError(
      errorData?.message ?? 'Failed to check payment status',
      response.status,
      errorData
    );
  }
  
  return await response.json();
}

// Handle success redirect from Stripe
export async function handlePaymentSuccess(sessionId: string): Promise<void> {
  try {
    const paymentStatus = await checkPaymentStatus(sessionId);
    
    if (paymentStatus.status === 'succeeded') {
      // Handle successful payment (e.g., update UI, show confirmation)
      console.log('Payment completed successfully');
    } else {
      // Payment is still processing or in another state
      console.log(`Payment status: ${paymentStatus.status}`);
    }
  } catch (error) {
    console.error('Error handling payment success:', error);
    throw error;
  }
}

// Handle cancel redirect from Stripe
export async function handlePaymentCancel(sessionId: string): Promise<void> {
  try {
    // Update UI to show payment was canceled
    console.log('Payment was canceled');
    
    // Optionally check the actual status
    const paymentStatus = await checkPaymentStatus(sessionId);
    console.log(`Current payment status: ${paymentStatus.status}`);
  } catch (error) {
    console.error('Error handling payment cancellation:', error);
    throw error;
  }
}

// Helper to extract session ID from Stripe return URL
export function extractSessionIdFromUrl(url: string): string | null {
  try {
    // Stripe URLs contain cs_test_* or cs_live_* as the session ID
    const match = url.match(/cs_(test|live)_[a-zA-Z0-9]+/);
    return match ? match[0] : null;
  } catch (error) {
    console.error('Error extracting session ID from URL:', error);
    return null;
  }
}
