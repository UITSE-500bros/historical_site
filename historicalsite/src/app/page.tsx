import Image from "next/image";
import { TitleSection } from "../components/section";
import { BANNER_TEXT, INTRO_TEXT } from "./content";
import Link from "next/link";
import ProfileCard from "../components/cards/ProfileCard";
import { HistoricalFigures } from "./content";
export default function Home() {
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
              Lịch sử đương đại phương tây
            </h1>
            <p
              className="mt-[60px] mx-5 font-[Actor] font-normal text-[20px] leading-[28px] tracking-[0] text-center"
              style={{ lineHeight: "28px" }}
            >
              {BANNER_TEXT}
            </p>
            <button className="flex h-14 justify-center items-center gap-1 [background:var(--Background,#FFFEF8)] px-12 py-5 mt-8">
              <a
                href="/history"
                className="text-[color:var(--Black,#1F1F1F)] text-center [leading-trim:both] [text-edge:cap] [font-family:Actor] text-base font-normal leading-[26px] uppercase"
              >
                Xem thêm
              </a>
            </button>
          </div>
        </header>

        <section>
          <TitleSection title="Giới thiệu" url="/about" />
          <div className="flex px-8 justify-between items-end self-stretch flex-wrap">
            <article className="w-full md:w-[400px] text-[color:var(--Black,#1F1F1F)] text-left [leading-trim:both] [text-edge:cap] [font-family:Actor] text-[20px] font-normal leading-[28px] tracking-[-0.05em]">
              {INTRO_TEXT}
            </article>
            <figure>
              <img
                className="w-[400px] h-[300px]"
                src="/home/monalisa.png"
                alt="Mona Lisa"
              />
            </figure>
            <figure>
              <img
                className="w-[400px] h-[600px]"
                src="/home/pisa.png"
                alt="Leaning Tower of Pisa"
              />
            </figure>
          </div>
        </section>

        <section>
          <TitleSection title="Khám Phá" url="/explore" />
          <div className="flex-col mt-[40px] flex px-8 justify-center">
            <div className="flex gap-4 flex-wrap justify-center items-center">
              <Link
                href="/explore"
                className="text-[color:var(--Black,#1F1F1F)] [leading-trim:both] [text-edge:cap] [font-family:Actor] text-base font-normal leading-[26px] uppercase"
              >
                Nhan vat tieu bieu
              </Link>
              <Link
                href="/"
                className="text-[color:var(--Black,#1F1F1F)] [leading-trim:both] [text-edge:cap] [font-family:Actor] text-base font-normal leading-[26px] uppercase"
              >
                Su kien lich su
              </Link>
              <Link
                href="/"
                className="text-[color:var(--Black,#1F1F1F)] [leading-trim:both] [text-edge:cap] [font-family:Actor] text-base font-normal leading-[26px] uppercase"
              >
                Tham quan online
              </Link>
            </div>

            <div className="grid grid-cols-3">
              {HistoricalFigures.map((figure, index) => (
                <ProfileCard
                  key={index}
                  name={figure.name}
                  content={figure.content}
                  image={figure.image}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
