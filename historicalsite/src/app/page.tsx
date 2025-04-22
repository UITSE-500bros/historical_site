import Image from "next/image";
import { TitleSection } from "../components/section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner section */}
      <main className="relative flex flex-col w-full">
        {/* Banner Image */}
        <div className="w-full">
          <Image
            src="/home/image 15.png"
            alt="Home Banner"
            layout="responsive"
            className="w-full h-auto object-cover"
            width={1440}
            height={917}
          />
        </div>

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          {/* Heading 1 */}
          <h1
            className="font-[Actor] font-normal text-[76px] leading-[72px] tracking-[-0.05em] text-center uppercase"
            style={{ lineHeight: "72px" }}
          >
            Lịch sử đương đại phương tây
          </h1>

          {/* Subheading */}
          <p
            className="mt-[60px]  mx-5 font-[Actor] font-normal text-[20px] leading-[28px] tracking-[0] text-center"
            style={{ lineHeight: "28px" }}
          >
            Lịch sử phương Tây là hành trình đầy biến động của những đế chế hùng
            mạnh, những cuộc cách mạng tư tưởng và những thành tựu vĩ đại, từ
            nền dân chủ Athens cổ đại đến Cách mạng Công nghiệp, tất cả đã định
            hình thế giới hiện đại như ta biết ngày nay
          </p>
          <button className="flex  h-14 justify-center items-center gap-1 [background:var(--Background,#FFFEF8)] px-12 py-5">
            <a
              href="/history"
              className="text-[color:var(--Black,#1F1F1F)] text-center [leading-trim:both] [text-edge:cap] [font-family:Actor] text-base font-normal leading-[26px] uppercase"
            >
              Xem thêm
            </a>
          </button>
        </div>

        {/* Overview Section */}
        <TitleSection title="Giới thiệu" />
        <div className="flex justify-between items-end self-stretch">
          <span className="w-full md:w-[400px] text-[color:var(--Black,#1F1F1F)] text-left [leading-trim:both] [text-edge:cap] [font-family:Actor] text-[20px] font-normal leading-[28px] tracking-[-0.05em]">
            Trang web của chúng tôi là cánh cửa mở ra thế giới lịch sử phương
            Tây, cung cấp những kiến thức sâu sắc, sự kiện quan trọng và bối
            cảnh lịch sử đầy đủ. Từ những nền văn minh cổ đại đến các cuộc cách
            mạng làm thay đổi thế giới, chúng tôi mang đến nội dung phong phú,
            dễ hiểu và hấp dẫn, giúp bạn khám phá dòng chảy lịch sử phương Tây
            một cách chân thực và sinh động.
          </span>

            <img
              className="w-[400px] h-[300px] "
              src="/home/monalisa.png"
              alt="Mona Lisa"
            />
            <img
              className="w-[400px] h-[600px] "
              src="/home/pisa.png"
              alt="Leaning Tower of Pisa"
            />
   
        </div>
      </main>
    </div>
  );
}
