"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ChevronRight, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/utils";
import "swiper/css";
import "swiper/css/pagination";

export function ImageSlider({ images }: { images: string[] }) {
  const router = useRouter();

  return (
    <div className="relative w-full aspect-4/3 bg-slate-200">
      {/* أزرار التحكم العلوية */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
        <button
          onClick={() => router.back()}
          className="p-2 bg-white/80 backdrop-blur rounded-full shadow-lg pointer-events-auto active:scale-90 transition"
        >
          <ChevronRight size={24} className="text-slate-800" />
        </button>
      </div>

      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="w-full h-full"
      >
        {images?.length > 0 ? (
          images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={getImageUrl(img)}
                alt={img}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 font-bold">
            لا توجد صور متوفرة
          </div>
        )}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #2563eb !important;
        }
      `}</style>
    </div>
  );
}
