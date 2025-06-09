"use client";

import { alegreya, nosifer } from "@/app/ui/fonts";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const teamMembers = [
  {
    name: "(Silvia Melani - Store manager)",
    role: "The Mistic Manager",
    description:
      "Penjaga keseimbangan antara dunia nyata dan aroma kopi. Dengan ketelitian dan kepemimpinan yang tajam, Silvia memastikan Bloody Espresso berjalan dengan harmonis—menyajikan pelayanan terbaik dengan sentuhan misteri yang menggoda.",
    image: "/orang.png",
  },
  {
    name: "(Rayhan Wildy - Desain Visual & Dekorasi)",
    role: "Head The Phantom Artisan",
    description:
      "Desain dan dekorasi di Bloody Espresso adalah hasil karya tangan Rayhan. Dengan sentuhan estetikanya yang gelap dan elegan, ia menciptakan suasana yang membawa pelanggan masuk ke dunia lain—di mana misteri dan kopi berpadu dalam harmoni.",
    image: "/orang.png",
  },
  {
    name: "(Elsa Dwita - Head of Barista)",
    role: "The Alchemist Barista",
    description:
      "Dengan tangan terampilnya, Elsa meracik kopi layaknya ramuan mistis. Setiap cangkir yang ia sajikan bukan sekadar minuman, tetapi sebuah pengalaman yang menggugah jiwa—meninggalkan jejak rasa yang tak terlupakan.",
    image: "/orang.png",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-red-950 to-black text-white relative overflow-y-auto">
      {/* Our Team Section */}
      <section className="py-10 flex flex-col items-center px-8 md:px-20 relative">
        <h1 className={`${nosifer.className} text-7xl font-extrabold text-center mb-12 text-[#f5deb3] drop-shadow-md`}>
          OUR TEAM
        </h1>
        
        <div className="relative w-full max-w-7xl">
          {/* Navigation Buttons */}
          <div className="absolute -left-12 top-[50%] -translate-y-1/2 z-10 text-[#f5deb3] cursor-pointer text-5xl font-bold hover:scale-125 transition swiper-button-prev-custom">
            ❮
          </div>
          <div className="absolute -right-12 top-[50%] -translate-y-1/2 z-10 text-[#f5deb3] cursor-pointer text-5xl font-bold hover:scale-125 transition swiper-button-next-custom">
            ❯
          </div>

          <Swiper
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
            }}
            modules={[Navigation, Pagination]}
            className="w-full mx-auto"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div className="flex flex-row items-center bg-[#5a1919]/50 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-[85vw] h-[600px] p-24 border border-[#8b4513]">
                  <div className="relative w-[500px] h-[500px] rounded-full overflow-hidden border-[6px] border-[#8b4513] shadow-md flex-shrink-0">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      fill
                      className="object-cover" 
                    />
                  </div>
                  
                  <div className="ml-12 text-left flex flex-col justify-center">
                    <h2 className={`${alegreya.className} text-4xl font-bold text-[#f5deb3] drop-shadow-lg`}>
                      {member.role}
                    </h2>
                    <h3 className={`${alegreya.className} text-3xl font-bold text-[#f5deb3]/80 drop-shadow-lg`}>
                      {member.name}
                    </h3>
                    <p className={`${alegreya.className} mt-6 text-2xl text-[#f5deb3]/80 leading-relaxed`}>
                      {member.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Pagination Bullets */}
          <div className="swiper-pagination-custom mt-8 flex justify-center"></div>
        </div>
      </section>
    </main>
  );
}