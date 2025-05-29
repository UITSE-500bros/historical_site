"use client";
import React, { use, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { MyPagination } from "@/src/components/section/MyPagination";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

const posts = [
  { id: 1, title: "First Post", category: "History", date: "2024-06-01" },
  { id: 2, title: "Second Post", category: "Culture", date: "2024-06-02" },
  // Add more posts as needed
];

export default function page() {
  const [articles, setArticles] = React.useState([]);

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = React.useState<number>(page);
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

  type Person = {
    articleId: string;
    articleName: string;
    articleType: string;
    personName: string;
    personAvatar: string;
    birthYear: number;
    deathYear: number | null;
    nationality: string;
  };
  type Event = {
    articleId: string;
    articleName: string;
    articleType: string;
    periodName: string;
    topicName: string;
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-6xl mx-auto h-full flex items-center justify-start min-h-screen">
        <CardHeader className="flex w-full justify-between items-center">
          <CardTitle className="text-2xl font-semibold">Article</CardTitle>
          <Button className="p-4  "> New Article</Button>
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
          <MyPagination
            currentPage={Number(currentPage)}
            setCurrentPage={setCurrentPage}
            totalPages={51}
            url="/admin/articles"
          />
        </CardFooter>
      </Card>
    </div>
  );
}
