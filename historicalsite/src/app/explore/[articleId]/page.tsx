// app/explore/[articleId]/page.tsx

import { ContentDisplay } from "@/src/app/explore/components/ContentDisplay";
import ContentTree from "@/src/app/explore/components/ContentTree";

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;
  let article = null;
  let fetchError = false;

  try {
    const res = await fetch(`http://localhost:8888/articles/${articleId}`);
    if (!res.ok) {
      fetchError = true;
    } else {
      article = await res.json();
      console.log(article);
    }
  } catch {
    fetchError = true;
  }

  return (
    <div className="flex h-full px-6 py-4">
      <aside className="w-1/4 h-screen overflow-y-auto sticky top-0  pr-4 border-r ">
        <h1 className="text-xl  font-bold mb-4">
          {fetchError ? "Không thể tải bài viết" : article.articleName}
        </h1>
        {!fetchError && <ContentTree contents={article.contents} />}
      </aside>
      <main className="w-3/4 pl-4 overflow-y-auto">
        {fetchError ? (
          <div className="text-red-500">Không thể tải nội dung bài viết.</div>
        ) : (
          <ContentDisplay contents={article.contents} />
        )}
      </main>
    </div>
  );
}
