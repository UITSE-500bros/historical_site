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
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Person, Event } from "./type";
import DeleteDialog from "@/src/components/DeleteDialog";

export default function Page() {
  const [articles, setArticles] = useState<(Person | Event)[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState<number>(page);
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const url = `http://localhost:8888/articles?page=${currentPage}&limit=10`;
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArticles(data.data);
        console.log("Fetched articles:", data.data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, [url]);

  const handleDelete = async (articleId: string) => {
    setDeleteLoading(true);
    try {
      const res = await fetch(`http://localhost:8888/articles/${articleId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete article");
      setArticles((prev) => prev.filter((a) => a.articleId !== articleId));
      setDeleteId(null);
      alert("Delete successful");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message || "Delete failed");
      } else if (typeof err === "string") {
        alert(err);
      } else {
        alert("An unknown error occurred");
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-6xl mx-auto h-full flex items-center justify-start min-h-screen">
        <CardHeader className="flex w-full justify-between items-center">
          <CardTitle className="text-2xl font-semibold">Article</CardTitle>
          <Link href={`/admin/articles/add`}>
            <Button>New Article</Button>
          </Link>
        </CardHeader>
        <CardContent className="w-full overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-left w-12">ID</TableHead>
                <TableHead className="text-left w-64">Title</TableHead>
                <TableHead className="text-left w-48">Type Info</TableHead>
                <TableHead className="text-left w-40">Details</TableHead>
                <TableHead className="text-left w-48">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article: Person | Event, index) => (
                <TableRow key={article.articleId}>
                  <TableCell className="w-12">{index + 1}</TableCell>
                  <TableCell className="w-64">{article.articleName}</TableCell>

                  <TableCell className="w-48">
                    {article.articleType === "PERSON"
                      ? (article as Person).personName
                      : (article as Event).topicName}
                  </TableCell>

                  <TableCell className="w-40">
                    {article.articleType === "PERSON"
                      ? `${(article as Person).birthYear} - ${
                          (article as Person).deathYear ?? "?"
                        }`
                      : (article as Event).periodName}
                  </TableCell>

                  <TableCell className="w-48 flex gap-2">
                    <Link href={`/admin/articles/${article.articleId}/edit`}>
                      <Button className="p-2">Edit</Button>
                    </Link>
                    <Button
                      className="p-2 ml-2"
                      variant="destructive"
                      onClick={() => setDeleteId(String(article.articleId))}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <MyPagination
            currentPage={Number(currentPage)}
            setCurrentPage={setCurrentPage}
            totalPages={51}
            url="/admin/articles"
          />
        </CardFooter>
      </Card>
      <DeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete Article"
        description="Are you sure you want to delete this article? This action cannot be undone."
        loading={deleteLoading}
      />
    </div>
  );
}
