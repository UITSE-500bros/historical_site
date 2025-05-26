"use client";
import React, { useState } from "react";
import { ContentNode } from "./ContentDisplay";

export default function ContentTree({ contents }: { contents: ContentNode[] }) {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderTree = (nodes: ContentNode[], level: number = 0) => {
    return nodes.map((node) => {
      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = expanded[node.contentId];

      return (
        <div key={node.contentId} className={`${level > 0 ? "ml-4" : ""} my-1`}>
          <div className="flex items-center">
            {hasChildren && (
              <button
                onClick={() => handleToggle(node.contentId)}
                className="mr-2 w-4 h-4 flex items-center justify-center text-xs border rounded hover:bg-gray-100"
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? "−" : "+"}
              </button>
            )}
            {!hasChildren && <div className="w-4 mr-2"></div>}
            <button
              onClick={() => handleScrollTo(node.contentId)}
              className={`text-left hover:text-blue-600 hover:underline ${
                level === 0
                  ? "font-semibold text-gray-800"
                  : level === 1
                  ? "font-medium text-gray-700"
                  : "text-gray-600"
              }`}
            >
              {node.contentName}
            </button>
          </div>
          {hasChildren && isExpanded && (
            <div className="mt-1">{renderTree(node.children!, level + 1)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="sticky top-4 bg-white border  rounded-lg p-4 shadow-sm">
      <h3 className="font-bold text-lg mb-3 text-gray-800">Table of Contents</h3>
      <div className="max-h-1/2 overflow-y-auto">{renderTree(contents)}</div>
    </div>
  );
}
