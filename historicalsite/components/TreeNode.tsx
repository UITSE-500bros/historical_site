import React from "react";

type Section = {
  id: number;
  title: string;
  parentId: number | null;
  children: Section[];
  content?: string;
  gallery?: GalleryImage[];
};

type GalleryImage = {
  url: string;
  caption: string;
  file: File;
};

type TreeNodeProps = {
  node: Section;
  onSelect: (section: Section) => void;
  selectedId: number | null | undefined;
  onAdd: (parentId: number | null) => void;
  onDelete: (id: number) => void;
  onMove?: (id: number, newParentId: number | null) => void;
};

export function TreeNode({
  node,
  onSelect,
  selectedId,
  onAdd,
  onDelete,
  onMove,
}: TreeNodeProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div className="ml-3">
      <div
        className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer hover:bg-blue-50 ${
          selectedId === node.id ? "bg-blue-100 border-l-4 border-blue-500" : ""
        }`}
        onClick={() => onSelect(node)}
      >
        {node.children && node.children.length > 0 && (
          <button
            type="button"
            className="text-xs text-gray-400 mr-1"
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed(!collapsed);
            }}
          >
            {collapsed ? "+" : "-"}
          </button>
        )}
        <span className="truncate flex-1">{node.title}</span>
        <button
          type="button"
          className="text-xs text-blue-500"
          onClick={(e) => {
            e.stopPropagation();
            onAdd(node.id);
          }}
        >
          + Section
        </button>
        <button
          type="button"
          className="text-xs text-red-400"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(node.id);
          }}
        >
          🗑
        </button>
      </div>
      {!collapsed &&
        node.children &&
        node.children.map((child: Section) => (
          <TreeNode
            key={child.id}
            node={child}
            onSelect={onSelect}
            selectedId={selectedId}
            onAdd={onAdd}
            onDelete={onDelete}
            onMove={onMove}
          />
        ))}
    </div>
  );
}
