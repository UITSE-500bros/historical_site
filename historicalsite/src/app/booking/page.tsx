'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Import components
import BookingForm from './components/BookingForm';
import MuseumDetails from './components/MuseumDetails';

// Import types and services
import { Museum, PaymentData } from './types';
import { fetchMuseums, createPayment } from './services/api';

// Constants
const TICKET_PRICE = 150000; // 150,000 VND per ticket

// Component that uses searchParams - must be wrapped in Suspense
function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const museumIdFromUrl = searchParams.get('museumId');
  
  const [museums, setMuseums] = useState<Museum[]>([]);
  const [selectedMuseum, setSelectedMuseum] = useState<string>(museumIdFromUrl ?? '');
  const [isLoadingMuseums, setIsLoadingMuseums] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch museums from the API
    const loadMuseums = async () => {
      try {
        setIsLoadingMuseums(true);
        const data = await fetchMuseums();
        setMuseums(data);
        
        // If museumId is provided in URL and exists in the fetched museums, select it
        if (museumIdFromUrl && data.some((museum: Museum) => museum.museumId === museumIdFromUrl)) {
          setSelectedMuseum(museumIdFromUrl);
        } else if (data.length > 0) {
          // Otherwise select the first museum by default
          setSelectedMuseum(data[0].museumId);
        }
      } catch (error) {
        console.error('Error fetching museums:', error);
        setError('Failed to load museums. Please try again later.');
      } finally {
        setIsLoadingMuseums(false);
      }
    };

    loadMuseums();
  }, [museumIdFromUrl]);

  const handleSelectMuseum = (museumId: string) => {
    setSelectedMuseum(museumId);
  };

  const handleSubmitBooking = async (paymentData: PaymentData) => {
    try {
      // Send payment request to the API
      const data = await createPayment(paymentData);

      console.log('Payment created successfully:', data);      
      // Redirect to Stripe checkout or success page
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        router.push('/payment/status?status=success');
      }
    } catch (error: Error | unknown) {
      console.error('Error creating payment:', error);
      setError(error instanceof Error ? error.message : 'Failed to process payment. Please try again later.');
      throw error; // Re-throw to let the form component handle the error state
    }
  };

  const selectedMuseumDetails = museums.find((museum: Museum) => museum.museumId === selectedMuseum);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Book Museum Tickets</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BookingForm 
          museums={museums}
          selectedMuseum={selectedMuseum}
          isLoadingMuseums={isLoadingMuseums}
          onSelectMuseum={handleSelectMuseum}
          onSubmit={handleSubmitBooking}
        />

        <MuseumDetails 
          museum={selectedMuseumDetails}
          isLoading={isLoadingMuseums}
          ticketPrice={TICKET_PRICE}
        />
      </div>
    </div>
  );
}

// Loading fallback for Suspense
function BookingFallback() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Book Museum Tickets</h1>
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    </div>
  );
}

// Main page component that wraps BookingContent in Suspense
export default function BookingPage() {
  return (
    <Suspense fallback={<BookingFallback />}>
      <BookingContent />
    </Suspense>
  );
}