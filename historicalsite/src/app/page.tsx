import Image from "next/image";
import Link from "next/link";
import ProfileCard from "../components/cards/ProfileCard";
import { TitleSection } from "../components/section";
import { BANNER_TEXT, HistoricalFigures } from "./content";
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

        <section>
          <TitleSection title="Explore" url="/explore" />
          <div className="flex-col mt-[40px] flex px-8 justify-center">
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
