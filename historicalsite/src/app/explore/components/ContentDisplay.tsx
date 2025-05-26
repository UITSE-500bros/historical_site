
type Content = {
  contentId: string;
  contentName: string;
  articleId: string;
  content: string;
  parentId?: string;
  children?: Content[];
}

export function ContentDisplay({ contents }: { contents: Content[] }) {

  return (
    <div className="space-y-8">
      
    </div>
  );
}
