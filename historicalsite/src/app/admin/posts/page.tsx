"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventList from "./components/EventList";
import PersonList from "./components/PersonList";

export default function Page() {
  const [tab, setTab] = useState<"EVENT" | "PERSON">("EVENT");

  return (
    <div className="space-y-6">
      <Tabs value={tab} onValueChange={(value) => setTab(value as "EVENT" | "PERSON")}>
        <TabsList>
          <TabsTrigger value="EVENT">Events</TabsTrigger>
          <TabsTrigger value="PERSON">People</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="overflow-y-auto">
        {tab === "EVENT" ? <EventList /> : <PersonList />}
      </div>
    </div>
  );
}