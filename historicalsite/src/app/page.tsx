import Image from "next/image";

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
            Lịch sử phương Tây là hành trình đầy biến động của những đế chế hùng mạnh, những cuộc cách mạng tư tưởng và những thành tựu vĩ đại, từ nền dân chủ Athens cổ đại đến Cách mạng Công nghiệp, tất cả đã định hình thế giới hiện đại như ta biết ngày nay
          </p>
        </div>
      </main>
    </div>
  );
}
