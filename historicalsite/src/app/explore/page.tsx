import ArticleCard from "@/src/components/cards/ArticleCard";

// Mark this page as dynamically rendered to avoid static generation issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Explore() {
  const url = `${process.env.API_BASE_URL}/articles/names`;
  let articles: any[] = [];
  try {
    // Add a timeout to the fetch to prevent hanging during build
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const res = await fetch(url, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    const data = await res.json();
    // Đảm bảo data là mảng
    articles = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
  } catch (e: unknown) {
    console.error("Failed to fetch articles:", e);
    articles = [];
  }

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
            articles
              .filter((item) => Array.isArray(item.articleContentList) && item.articleContentList.length > 0)
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
