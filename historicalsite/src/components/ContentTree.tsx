// components/ContentTree.tsx
"use client";
import Link from "next/link";

export default function ContentTree({ contents }: { contents: any[] }) {
  const renderTree = (parentId: string | null) => {
    return contents
      .filter((c) => c.parentId === parentId)
      .map((item) => (
        <div key={item.contentId} className="ml-4 my-1">
          <Link href={`#${item.contentId}`} className="text-blue-600 hover:underline">
            {item.contentName}
          </Link>
          {renderTree(item.contentId)}
        </div>
      ));
  };

  return <div>{renderTree(null)}</div>;
}
