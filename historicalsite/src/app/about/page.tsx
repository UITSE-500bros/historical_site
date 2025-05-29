import MapCard from '@/src/components/cards/MapCard';
import Image from "next/image";
import { MapFigures } from './content';
export default function About() {
  return (
    <div className='flex flex-col min-h-screen items-center justify-center'>
      {/* <div
        className=" w-[500px] h-[200px] items-center justify-center flex 
      border-2  rounded-full"
      >
        <h1 className="text-[color:var(--Black,#1F1F1F)] text-center [leading-trim:both] [text-edge:cap] [font-family:Actor] text-[64px] font-normal leading-[44px] tracking-[-3.2px] uppercase">
         About
        </h1>
      </div> */}
      <section>
        <div className="w-[1350px] h-[700px] overflow-hidden rounded-xl relative  mt-10 mb-10">
          <Image
            src="/home/MainImageAbout.jpg"
            alt="Home Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h1
                className="font-[Adamina] font-normal text-[76px] leading-[72px] tracking-[-0.05em] text-center uppercase"
                style={{ lineHeight: "64px" }}
              >
                Explore the 
              </h1>
              <h1
                className="font-[Adamina] font-normal text-[76px] leading-[72px] tracking-[-0.05em] text-center uppercase"
                style={{ lineHeight: "64px" }}
              >
                Western History
              </h1>
            </div>
        </div>
        </section>
      <section className="w-full justify-center">
      <div className="w-full max-w-[1440px] mx-auto px-6">
        <div className="w-full flex flex-col items-center justify-center mt-[60px]">
          <h1 className="font-[Adamina] text-[76px] leading-[64px] tracking-[-0.05em] text-center uppercase mb-5">
            (476-1453)
          </h1>
          <h1 className="font-[Adamina] text-[76px] leading-[64px] tracking-[-0.05em] text-center uppercase">
            MIDDLE AGES
          </h1>
        </div>

      <div className="grid grid-cols-4 gap-6 mt-10">
        {MapFigures.map((figure, index) => (
          <MapCard key={index} topic={figure.topic} image={figure.image} period='Middle Ages'/>
        ))}
      </div>
    </div>
    </section>
    <section className="w-full justify-center">
      <div className="w-full max-w-[1440px] mx-auto px-6">
        <div className="w-full flex flex-col items-center justify-center mt-[60px]">
          <h1 className="font-[Adamina] text-[76px] leading-[64px] tracking-[-0.05em] text-center uppercase mb-5">
            (1300-1600)
          </h1>
          <h1 className="font-[Adamina] text-[76px] leading-[64px] tracking-[-0.05em] text-center uppercase">
            Renaissance
          </h1>
        </div>

      <div className="grid grid-cols-4 gap-6 mt-10">
        {MapFigures.map((figure, index) => (
          <MapCard key={index} topic={figure.topic} image={figure.image} period='Renaissance' />
        ))}
      </div>
    </div>
    </section>
    <section className="w-full justify-center">
      <div className="w-full max-w-[1440px] mx-auto px-6">
        <div className="w-full flex flex-col items-center justify-center mt-[60px]">
          <h1 className="font-[Adamina] text-[76px] leading-[64px] tracking-[-0.05em] text-center uppercase mb-5">
            (1650-1800)
          </h1>
          <h1 className="font-[Adamina] text-[76px] leading-[64px] tracking-[-0.05em] text-center uppercase">
            Enlightenment
          </h1>
        </div>
      <div className="grid grid-cols-4 gap-6 mt-10">
        {MapFigures.map((figure, index) => (
          <MapCard key={index} topic={figure.topic} image={figure.image} period='Enlightenment' />
        ))}
      </div>
    </div>
    </section>
    </div>
  )
}
