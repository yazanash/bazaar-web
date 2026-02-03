import { Heart, Share2, MapPin, Eye } from "lucide-react";
import Link from "next/link";

export function VehicleCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      {/* 1. قسم الصورة مع التناسب 170x100 */}
      <div className="relative aspect-170/100 bg-slate-200 flex items-center justify-center overflow-hidden">
        {/* استبدل src بصورة حقيقية لاحقاً */}
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=400" 
          alt="اسم المركبة" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Placeholder للنص كما في الصورة */}
        {/* <span className="text-slate-400 font-bold text-xl">170 × 100</span> */}
      </div>

      {/* 2. محتوى البيانات */}
      <div className="p-3 space-y-2" dir="rtl">
        {/* اسم المركبة */}
        <h3 className="text-base font-bold text-slate-800 truncate">مرسيدس بنز G-Class</h3>

        {/* السعر والمنطقة */}
        <div className="flex flex-col items-start gap-1">
          <span className="text-lg font-black text-slate-900 leading-none">$14,000</span>
          <div className="flex items-center gap-1 text-slate-500">
            <MapPin size={14} />
            <span className="text-xs font-bold">السويداء</span>
          </div>
        </div>

        {/* الأيقونات السفلية (التفاعل) */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-50">
          <div className="flex gap-3 text-slate-400">
             <button className="hover:text-red-500 transition-colors">
                <Heart size={20} />
             </button>
             <button className="hover:text-blue-500 transition-colors">
                <Share2 size={20} />
             </button>
          </div>
          
          <div className="flex items-center gap-1 text-slate-400">
             <span className="text-xs font-bold">000</span>
             <Eye size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}