'use client';

import { Museum } from '../types';

interface MuseumDetailsProps {
  museum: Museum | undefined;
  isLoading: boolean;
  ticketPrice: number;
}

export default function MuseumDetails({ 
  museum, 
  isLoading,
  ticketPrice 
}: MuseumDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Museum Details</h2>
      <p className="text-gray-600 mb-6">Information about the selected museum</p>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-8 w-8 border-t-2 border-blue-500 rounded-full"></div>
        </div>
      ) : museum ? (
        <div className="space-y-4">
          <div className="aspect-video overflow-hidden rounded-lg relative">
            {museum.museumImage && (
              <img
                src={museum.museumImage}
                alt={museum.museumName}
                className="w-full h-48 object-cover"
              />
            )}
          </div>
          <h3 className="text-xl font-semibold">{museum.museumName}</h3>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Address:</span> {museum.museumAddress}
            </p>
            <p className="text-sm">
              <span className="font-medium">Phone:</span> {museum.museumPhone}
            </p>
            <p className="text-sm">
              <span className="font-medium">Email:</span> {museum.museumEmail}
            </p>
          </div>
          <div className="pt-4">
            <h4 className="font-medium mb-2">Ticket Information</h4>
            <p className="text-sm">
              Price per ticket: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ticketPrice)}
            </p>
            <p className="text-sm">
              Opening hours: 9:00 AM - 5:00 PM, Tuesday to Sunday
            </p>
            <p className="text-sm">
              Closed on Mondays and public holidays
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p>Please select a museum to view details</p>
        </div>
      )}
      
      <div className="mt-6 pt-6 border-t">
        <p className="text-sm text-gray-500">
          * Tickets are valid only for the selected date
        </p>
      </div>
    </div>
  );
}
