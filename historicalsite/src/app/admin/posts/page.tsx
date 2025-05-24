'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useRef, useState } from "react";

export default function Page() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <Card className="grid grid-cols-[1fr_2.5fr] w-full">
        <div>
          <CardHeader >
            <CardTitle className="text-xl font-semibold">General Information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <form className="flex flex-col gap-4">
              {/* Title */}
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded p-2"
                  placeholder="Enter article title"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="border rounded p-2"
                >
                  <option value="">Select a category</option>
                  <option value="history">History</option>
                  <option value="culture">Culture</option>
                  <option value="art">Art</option>
                  <option value="science">Science</option>
                </select>
              </div>

              {/* Drag and Drop Upload */}
              <div className="flex flex-col gap-2 border-b">
                <label className="text-sm font-medium">Image</label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg w-full aspect-square flex items-center justify-center cursor-pointer relative"
                  onClick={handleClick}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="object-cover w-full h-full rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm text-center">
                      Drag & drop or click to upload image
                    </span>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </div>

        <main className="flex flex-col gap-4 p-4">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Edit Article</h1>
                <div className="flex gap-2">
                    <Button>Save</Button>
                    <Button variant="outline">Cancel</Button>

                </div>
            </header>

            <div className="flex justify-center items-center h-full">
                <textarea
                    className="w-full h-full border rounded p-4"
                    placeholder="Write your article content here..."
                ></textarea>

            </div>

        </main>
      </Card>
    </div>
  );
}
