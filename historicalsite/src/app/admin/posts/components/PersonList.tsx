// components/admin/EventList.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import PostTable, { Column } from "./PostTable";

type Person = {
  articleId: string;
  articleName: string;
  personName: string;
  birthYear: number;
  nationality: string;
};

export default async function PersonList() {
  const res = await fetch("http://localhost:8888/articles?page=1&limit=10&articleType=PERSON", {
    cache: "no-store",
  });
  const json = await res.json();
  const people: Person[] = json.data;

  const columns: Column<Person>[] = [
    { header: "STT", width: "w-12", render: (_, i) => i + 1 },
    { header: "Name", width: "w-64", render: (e) => e.personName },
    { header: "Born", width: "w-48", render: (e) => e.birthYear },
    { header: "Country", width: "w-40", render: (e) => e.nationality },
    {
      header: "Actions",
      width: "w-48",
      render: (e) => (
        <div className="flex gap-2">
          <Link href={`/admin/posts/${e.articleId}/edit`}>
            <Button size="sm">Edit</Button>
          </Link>
          <Button size="sm" variant="destructive">
            Delete
          </Button>
        </div>
      ),
    },
  ];
  if (!people || people.length === 0) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="flex justify-between">
          <h2 className="text-xl">People</h2>
          <Link href="/admin/posts/new?type=PERSON">
            <Button>New Person</Button>
          </Link>
        </CardHeader>
        <CardContent className="text-center p-8">
          <p>No people found. Please create a new person.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex justify-between">
        <h2 className="text-xl">Events</h2>
        <Link href="/admin/posts/new?type=EVENT">
          <Button>New Event</Button>
        </Link>
      </CardHeader>
      <CardContent className="overflow-auto">
        <PostTable data={people} columns={columns} />
      </CardContent>
      <CardFooter>
        <div className="flex justify-end w-full">
          {/* Pagination placeholder */}
        </div>
      </CardFooter>
    </Card>
  );
}
