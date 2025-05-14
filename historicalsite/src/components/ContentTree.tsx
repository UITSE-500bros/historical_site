// components/ContentTree.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

export default function ContentTree({ contents }: { contents: any[] }) {
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
    const handleToggle = (id: string) => {
        setExpanded((prev)=>({
            ...prev,
            [id]:!prev[id],
        }));
    };

  const renderTree = (parentId: string | null) => {
    return contents
      .filter((c) => c.parentId === parentId)
      .map((item) => {
        const hasChildren = contents.some((c) => c.parentId === item.contentId);
        return (
        <div key={item.contentId} className="ml-4 my-1">
            {hasChildren && (
              <button
                onClick={() => handleToggle(item.contentId)}
                className="mr-1"
                aria-label={expanded[item.contentId] ? "Collapse" : "Expand"}
              >
                {expanded[item.contentId] ? "-" : "+"}
              </button>
            )}
          <Link href={`#${item.contentId}`} className="text-blue-600 hover:underline">
            {item.contentName}
          </Link>
         {hasChildren && expanded[item.contentId] && renderTree(item.contentId)}
        </div>
      )});
  };

  return <div className=" sticky top-0 z-10">{renderTree(null)}</div>;
    }
