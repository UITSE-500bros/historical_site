'use client';

import { useState } from 'react';
import { Museum, PaymentData, PaymentStatus, PaymentType } from '../types';

interface BookingFormProps {
  museums: Museum[];
  selectedMuseum: string;
  isLoadingMuseums: boolean;
  onSelectMuseum: (museumId: string) => void;
  onSubmit: (paymentData: PaymentData) => Promise<void>;
}

export default function BookingForm({
  museums,
  selectedMuseum,
  isLoadingMuseums,
  onSelectMuseum,
  onSubmit
}: BookingFormProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [date, setDate] = useState<Date>(new Date());
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Price per ticket (in VND)
  const TICKET_PRICE = 150000; // 150,000 VND per ticket

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMuseum || !date || !email || quantity < 1) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Calculate total price
      const totalPrice = TICKET_PRICE * quantity;

      // Create payment data using our interface and enums
      const paymentData: PaymentData = {
        userEmail: email,
        quantity,
        paymentType: PaymentType.DEBIT_CARD, // Default payment type
        status: PaymentStatus.PENDING,
        bookingDate: date.toISOString(),
        totalPrice,
        museumId: selectedMuseum
      };

      await onSubmit(paymentData);
    } catch (error: Error | unknown) {
      console.error('Error creating payment:', error);
      setError(error instanceof Error ? error.message : 'Failed to process payment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Ticket Information</h2>
      <p className="text-gray-600 mb-6">Fill in the details to book your museum visit</p>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="museum" className="block font-medium">Select Museum</label>
          {isLoadingMuseums ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin h-4 w-4 border-t-2 border-blue-500 rounded-full"></div>
              <span>Loading museums...</span>
            </div>
          ) : (
            <select 
              id="museum"
              value={selectedMuseum}
              onChange={(e) => onSelectMuseum(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a museum</option>
              {museums.map((museum: Museum) => (
                <option key={museum.museumId} value={museum.museumId}>
                  {museum.museumName}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="block font-medium">Visit Date</label>
          <input
            id="date"
            type="date"
            value={date.toISOString().split('T')[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="quantity" className="block font-medium">Number of Tickets</label>
          <div className="flex items-center space-x-2">
            <button 
              type="button" 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 border rounded"
            >
              -
            </button>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-20 text-center p-2 border rounded"
            />
            <button 
              type="button" 
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block font-medium">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <p className="text-sm text-gray-500">
            Your ticket will be sent to this email address
          </p>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <span>Processing...</span>
            ) : (
              `Book Now - ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(TICKET_PRICE * quantity)}`
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
