"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import DeleteDialog from "@/src/components/DeleteDialog";

interface Museum {
  museumId: string;
  museumName: string;
  museumImage: string;
  museumAddress: string;
  museumPhone: string;
  museumEmail: string;
  createdAt: string;
  updatedAt: string;
}

export default function MuseumsPage() {
  const [museums, setMuseums] = useState<Museum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchMuseums = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:8888/museums");
        if (!res.ok) throw new Error("Failed to fetch museums");
        const data = await res.json();
        setMuseums(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchMuseums();
  }, []);

  const handleDelete = async (museumId: string) => {
    setDeleteLoading(true);
    try {
      const res = await fetch(`http://localhost:8888/museums/${museumId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete museum");
      setMuseums((prev) => prev.filter((m) => m.museumId !== museumId));
      setDeleteId(null);
    } catch (err: any) {
      alert(err.message || "Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Museum Management
          </CardTitle>
          <Link href="/admin/museums/add">
            <Button>Add Museum</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : museums.length === 0 ? (
            <div className="text-center py-8">No museums found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Created At</TableHead>

                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {museums.map((museum) => (
                  <TableRow key={museum.museumId}>
                    <TableCell>
                      <img
                        src={museum.museumImage}
                        alt={museum.museumName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>{museum.museumName}</TableCell>
                    <TableCell>{museum.museumAddress}</TableCell>
                    <TableCell>{museum.museumPhone}</TableCell>
                    <TableCell>{museum.museumEmail}</TableCell>
                    <TableCell>
                      {new Date(museum.createdAt).toLocaleString()}
                    </TableCell>

                    <TableCell className="flex gap-2">
                      <Link href={`/admin/museums/${museum.museumId}/edit`}>
                        <Button size="sm">Edit</Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(museum.museumId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <DeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete Museum"
        description="Are you sure you want to delete this museum? This action cannot be undone."
        loading={deleteLoading}
      />
    </div>
  );
}
