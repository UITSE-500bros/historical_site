import React from "react";
import type { JSX } from "react";
import "./style.css";
import Image from "next/image";

export type ContentNode = {
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
    id,
  }: {
    level?: number;
    children: React.ReactNode;
    id?: string;
  }) => {
    const Tag = `h${Math.min(level || 1, 6)}` as keyof JSX.IntrinsicElements;
    return <Tag id={id}>{children}</Tag>;
  };

  return (
    <div className="ContentDisplay space-y-8">
      {contents.map((content) => (
        <div key={content.contentId} className="space-y-4">
          {" "}
          {/* heading section */}
          <HeadingTag level={level} id={content.contentId}>
            {content.contentName}
          </HeadingTag>
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
                    <Image
                      key={image.imageId}
                      src={image.src}
                      alt={image.alt}
                      className="mx-auto rounded-xl shadow-md max-w-full h-auto"
                      width={image.width}
                      height={image.height}
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
