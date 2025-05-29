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

type Event = {
  articleId: string;
  articleName: string;
  periodName: string;
  topicName: string;
};

export default async function EventList() {
  const res = await fetch("http://localhost:8888/articles?page=1&limit=10&articleType=EVENT", {
    cache: "no-store",
  });
  const json = await res.json();
  const events: Event[] = json.data;

  const columns: Column<Event>[] = [
    { header: "STT", width: "w-12", render: (_, i) => i + 1 },
    { header: "Title", width: "w-64", render: (e) => e.articleName },
    { header: "Period", width: "w-48", render: (e) => e.periodName },
    { header: "Topic", width: "w-40", render: (e) => e.topicName },
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
  if(!events || events.length === 0) {
    return (
        <Card className="flex flex-col">
            <CardHeader className="flex justify-between">
            <h2 className="text-xl">Events</h2>
            <Link href="/admin/posts/new?type=EVENT">
                <Button>New Event</Button>
            </Link>
            </CardHeader>
            <CardContent className="text-center p-8">
            <p>No events found. Please create a new event.</p>
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
        <PostTable data={events} columns={columns} />
      </CardContent>
      <CardFooter>
        <div className="flex justify-end w-full">
          {/* Pagination placeholder */}
        </div>
      </CardFooter>
    </Card>
  );
}
