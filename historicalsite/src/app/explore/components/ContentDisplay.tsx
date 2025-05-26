import React from "react";
import type { JSX } from "react";
import "./style.css";

type ContentNode = {
  contentId: string;
  contentName: string;
  articleId: string;
  content: string;
  parentId?: string;
  children?: ContentNode[];
  images?: {
    imageId: string;
    contentId: string;
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  }[];
};

export function ContentDisplay({
  contents,
  level,
}: {
  contents: ContentNode[];
  level?: number;
}) {
  const HeadingTag = ({
    level,
    children,
  }: {
    level?: number;
    children: React.ReactNode;
  }) => {
    const Tag = `h${Math.min(level || 1, 6)}` as keyof JSX.IntrinsicElements;
    return <Tag>{children}</Tag>;
  };

  return (
    <div className="ContentDisplay space-y-8">
      {contents.map((content) => (
        <div key={content.contentId} className="space-y-4">
          {/* heading section */}
          <HeadingTag level={level}>{content.contentName}</HeadingTag>
          {content.content && (
            <div
              className="text-lg"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          )}{" "}
          {/* image section */}
          {content.images && content.images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {content.images.map((image) => (
                <figure key={image.imageId} className="space-y-2">
                  {image.src && (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="mx-auto rounded-xl shadow-md max-w-full h-auto"
                    />
                  )}
                  {image.caption && (
                    <figcaption className="text-center text-sm text-gray-600">
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
          {/* children contents */}
          {content.children && content.children.length > 0 && (
            <ContentDisplay
              contents={content.children}
              level={(level || 1) + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
}
