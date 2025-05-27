"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MyPagination } from "@/src/components/section/MyPagination";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();
  const handleOnEdit = (postId: number) => {
    // Logic to handle editing the post
    router.push(`/admin/posts/${postId}/edit`);
  };
  const posts = [
    {
      id: 1,
      title: "Post 1",
      category: "Event",
      date: "2023-10-01",
    },
    {
      id: 2,
      title: "Post 2",
      category: "News",
      date: "2023-10-02",
    },
    {
      id: 3,
      title: "Post 3",
      category: "Update",
      date: "2023-10-03",
    },
    {
      id: 4,
      title: "Post 4",
      category: "Announcement",
      date: "2023-10-04",
    },
    {
      id: 5,
      title: "Post 5",
      category: "Event",
      date: "2023-10-05",
    },
  ];
  return (
    <Card className="w-full max-w-6xl mx-auto h-full flex items-center justify-start min-h-screen">
      <CardHeader className="flex w-full justify-between items-center">
        <CardTitle className="text-2xl font-semibold">Posts</CardTitle>
        <Button className="p-4  "> New post</Button>
      </CardHeader>
      <CardContent className="w-full overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left w-12">Id</TableHead>
              <TableHead className="w-64 text-left">Title</TableHead>
              <TableHead className="w-48 text-left">Category</TableHead>
              <TableHead className="w-40 text-left">Date</TableHead>
              <TableHead className="w-48 text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="w-12">{post.id}</TableCell>
                <TableCell className="w-64">{post.title}</TableCell>
                <TableCell className="w-48">{post.category}</TableCell>
                <TableCell className="w-40">{post.date}</TableCell>
                <TableCell className="w-48 flex gap-2">
                  <Button onClick={() => handleOnEdit(post.id)} className="p-2">
                    Edit
                  </Button>
                  <Button className="p-2 ml-2" variant="destructive">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <MyPagination />
      </CardFooter>
    </Card>
  );
}
