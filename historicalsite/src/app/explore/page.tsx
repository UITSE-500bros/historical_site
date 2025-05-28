import ArticleCard from "@/src/components/cards/ArticleCard";
import { MyPagination } from "@/src/components/section/MyPagination";

export default async function Explore() {
  const url = "http://localhost:8888/articles/names";
  const res = await fetch(url);
  const articles = await res.json();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="mt-12 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900">
          Khám Phá Lịch Sử
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Hành trình khám phá các giai đoạn quan trọng trong lịch sử châu Âu
        </p>
      </div>

      <div className="w-full mt-[80px] px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(articles) &&
            articles.filter((item)=>item.articleContentList.length > 0)
            .map((item) => (
              <ArticleCard
                key={item.articleId}
                id={item.articleId}
                title={item.articleName}
              />
            ))}
        </div>
      </div>

      <MyPagination />
    </div>
  );
}
