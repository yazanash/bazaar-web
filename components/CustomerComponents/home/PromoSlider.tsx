"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { AdBannerResponse } from "@/types/adBanner";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";
interface PromoProps {
  adBanners: AdBannerResponse[];
}
export function PromoSlider({ adBanners }: PromoProps) {
  return (
    <div className="px-3 md:px-4 py-2 w-full max-w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className="w-full aspect-[2.5/1] md:aspect-3/1 rounded-2xl md:rounded-[2.5rem] shadow-sm border border-white"
      >
        {adBanners.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link href={slide.link} target="_blank" className="w-full h-full">
              <img
                src={getImageUrl(slide.imageUrl)}
                className="w-full h-full object-cover"
                alt="promo"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 5px;
          height: 5px;
        }
        .swiper-pagination-bullet-active {
          width: 12px !important;
        }
        .swiper-pagination {
          bottom: 5px !important;
        }
      `}</style>
    </div>
  );
}
