// app/explore/[articleId]/page.tsx
import { ContentDisplay } from "@/src/components/ContentDisplay";
import ContentTree from "@/src/components/ContentTree";
import { notFound } from "next/navigation";

export default async function ArticleDetail({
  params,
}: {
  params: { articleId: string };
}) {
  const res = await fetch(`http://localhost:8888/articles/${params.articleId}`);
  if (!res.ok) return notFound();

  const article = await res.json();

  return (
    <div className="flex h-full px-6 py-4">
      {/* Sidebar cây mục lục */}
      <aside className="w-1/4 h-screen overflow-y-auto sticky top-0  pr-4 border-r ">
        <h2 className="text-xl  font-bold mb-4">{article.articleName}</h2>
        <ContentTree contents={article.contents} />
      </aside>

      {/* Khu vực nội dung hiển thị */}
      <main className="w-3/4 pl-4 overflow-y-auto">
        <ContentDisplay contents={article.contents} />
      </main>
    </div>
  );
}
