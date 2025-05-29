"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMuseumPage() {
  const [museumName, setMuseumName] = useState("");
  const [museumImage, setMuseumImage] = useState("");
  const [museumAddress, setMuseumAddress] = useState("");
  const [museumPhone, setMuseumPhone] = useState("");
  const [museumEmail, setMuseumEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (
      !museumName.trim() ||
      !museumImage.trim() ||
      !museumAddress.trim() ||
      !museumPhone.trim() ||
      !museumEmail.trim()
    ) {
      setMessage("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8888/museums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          museumName,
          museumImage,
          museumAddress,
          museumPhone,
          museumEmail,
        }),
      });
      if (!res.ok) throw new Error("Failed to add museum");
      setMessage("Museum added successfully!");
      console.log(await res.json());
      
  
    } catch (err: any) {
      setMessage(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Museum</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Museum Name</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={museumName}
            onChange={(e) => setMuseumName(e.target.value)}
            placeholder="Enter museum name"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Museum Image URL</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={museumImage}
            onChange={(e) => setMuseumImage(e.target.value)}
            placeholder="Enter image URL"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Museum Address</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={museumAddress}
            onChange={(e) => setMuseumAddress(e.target.value)}
            placeholder="Enter address"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Museum Phone</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={museumPhone}
            onChange={(e) => setMuseumPhone(e.target.value)}
            placeholder="Enter phone number"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Museum Email</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={museumEmail}
            onChange={(e) => setMuseumEmail(e.target.value)}
            placeholder="Enter email"
            disabled={loading}
          />
        </div>
        {message && (
          <div
            className={`text-sm ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded font-semibold"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Museum"}
        </button>
      </form>
    </div>
  );
}
