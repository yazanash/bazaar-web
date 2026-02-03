"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// استيراد الستايليات الأساسية
import 'swiper/css';
import 'swiper/css/pagination';

export function PromoSlider() {
  const slides = [
    { id: 1,  img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600" },
    { id: 2,  img: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=600" },
  ];

  return (
   <div className="px-3 md:px-4 py-2 w-full max-w-full overflow-hidden">
  <Swiper
    modules={[Autoplay, Pagination]}
    spaceBetween={10}
    slidesPerView={1}
    autoplay={{ delay: 3000 }}
    pagination={{ clickable: true }}
    // التغيير السحري هنا: aspect-[2.5/1] يعني العرض مرتين ونص قد الارتفاع
    className="w-full aspect-[2.5/1] md:aspect-3/1 rounded-2xl md:rounded-[2.5rem] shadow-sm border border-white"
  >
    {slides.map((slide) => (
      <SwiperSlide key={slide.id}>
        <div className="w-full h-full">
           <img 
             src={slide.img} 
             className="w-full h-full object-cover" 
             alt="promo"
           />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>

  <style jsx global>{`
    /* تصغير حجم النقاط ليتناسب مع الارتفاع الصغير */
    .swiper-pagination-bullet { width: 5px; height: 5px; }
    .swiper-pagination-bullet-active { width: 12px !important; }
    .swiper-pagination { bottom: 5px !important; }
  `}</style>
</div>
  );
}