import ArticleCard from "@/src/components/cards/ArticleCard";

export default async function Explore() {
  const url = "http://localhost:8888/articles/names";
  let articles: any[] = [];
  try {
    const res = await fetch(url);
    const data = await res.json();
    // Ensure data is an array
    articles = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
      ? data.data
      : [];
  } catch (e: unknown) {
    console.error("Failed to fetch articles:", e);
    articles = [];
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="mt-12 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900">
          Explore History
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Journey through the most important periods in European history
        </p>
      </div>

      <div className="w-full mt-[80px] px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(articles) &&
            articles
              .filter(
                (item) =>
                  Array.isArray(item.articleContentList) &&
                  item.articleContentList.length > 0
              )
              .map((item) => (
                <ArticleCard
                  key={item.articleId}
                  id={item.articleId}
                  title={item.articleName}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
