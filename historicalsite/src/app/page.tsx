import Image from "next/image";
import Link from "next/link";
import { TitleSection } from "../components/section";
import { BANNER_TEXT } from "./content";
// Mark this page as dynamically rendered to avoid static generation issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  let data = [];
  try {
    const url = `${process.env.API_BASE_URL}/articles?page=1&limit=4`;
    
    // Add a timeout to the fetch to prevent hanging during build
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const res = await fetch(url, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    const responseData = await res.json();
    data = responseData?.data || [];
    
    console.log("Fetched articles:", data);
  } catch (e) {
    console.error("Failed to fetch articles:", e);
    data = [];
  }

  type Article = {
    articleId: string;
    articleName: string;
    articleType: string;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner section */}
      <main className="relative flex flex-col w-full">
        <header className="relative w-full">
          <Image
            src="/home/image 15.png"
            alt="Home Banner"
            layout="responsive"
            className="w-full h-auto object-cover"
            width={1440}
            height={917}
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <h1
              className="font-[Actor] font-normal text-[76px] leading-[72px] tracking-[-0.05em] text-center uppercase"
              style={{ lineHeight: "72px" }}
            >
              Western Contemporary History
            </h1>
            <p
              className="mt-10 mx-5 font-[Actor] font-normal text-2xl md:text-3xl leading-8 md:leading-10 tracking-normal text-center bg-white/40 backdrop-blur-md rounded-lg px-6 py-4 shadow-lg text-black"
              style={{ lineHeight: "32px" }}
            >
              {BANNER_TEXT}{" "}
            </p>
            <Link
              href="/explore"
              className="flex h-14 justify-center items-center gap-1 [background:var(--Background,#FFFEF8)] px-12 py-5 mt-8"
            >
              <span className="text-[color:var(--Black,#1F1F1F)] text-center [leading-trim:both] [text-edge:cap] [font-family:Actor] text-base font-normal leading-[26px] uppercase">
                Explore Now
              </span>
            </Link>
          </div>
        </header>

        <section className="px-6 md:px-12 py-12">
          <TitleSection title="About" url="/about" />
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
            <article className="flex-1 text-[color:var(--Black,#1F1F1F)] font-[Actor] text-[25px] leading-[28px] tracking-[-0.05em] text-center md:text-left">
              The Western Renaissance was a period of profound transformation in
              art, science, philosophy, and society. It marked the rebirth of
              classical values, the flourishing of creativity, and the emergence
              of new ideas that shaped the modern world. From the masterpieces
              of Leonardo da Vinci to the architectural wonders of the era, the
              Renaissance continues to inspire generations and connect the past
              with the present.
            </article>{" "}
            <figure className="flex-1 flex flex-col items-center">
              <Image
                className="w-[320px] h-[400px] md:w-[400px] md:h-[500px] rounded-xl shadow-lg object-cover"
                src="/home/monalisa.png"
                alt="Mona Lisa"
                width={400}
                height={500}
              />
              <figcaption className="text-sm text-gray-500 mt-2">
                Mona Lisa
              </figcaption>
            </figure>
          </div>
        </section>

        <section className=" py-12">
          <TitleSection title="Explore" url="/explore" />

          <div className="mt-[40px] w-full px-8">
            <div className="flex flex-row justify-center  gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pb-4">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((article: Article) => (
                  <div
                    key={article.articleId}
                    className="flex-shrink-0 overflow-auto w-[240px] md:w-[260px] lg:w-[280px] xl:w-[300px] bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-200 flex flex-col items-start justify-between p-6 mx-2 cursor-pointer group"
                  >
                    <div className="font-bold text-lg mb-2 group-hover:text-blue-700 transition-colors duration-200 truncate w-full">
                      {article.articleName}
                    </div>
                    <div className="text-gray-500 text-sm mb-4 truncate w-full">
                      {article.articleType || "Unknown type"}
                    </div>
                    <div className="mt-auto w-full flex justify-end">
                      <Link
                        href={`/admin/articles/${article.articleId}/edit`}
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 italic">
                  No articles found or API error
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
