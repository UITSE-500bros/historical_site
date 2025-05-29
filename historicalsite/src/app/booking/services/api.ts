import { Museum, PaymentData } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Fetch all museums from the API
 */
export async function fetchMuseums(): Promise<Museum[]> {
  const response = await fetch(`${API_BASE_URL}/museums`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch museums');
  }
  
  return response.json();
}

/**
 * Create a payment for booking museum tickets
 */
export async function createPayment(paymentData: PaymentData): Promise<{ checkoutUrl?: string }> {
  const response = await fetch(`${API_BASE_URL}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to create payment');
  }

  return response.json();
}
