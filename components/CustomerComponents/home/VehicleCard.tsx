"use client"
import { Heart, Share2, MapPin, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { VehicleAdResponse } from "@/types/ad";
import { getImageUrl } from "@/lib/utils";
import { toggleFavoriteAction } from "@/lib/actions/ads";
interface VehicleCardProps {
  ad: VehicleAdResponse;
}
export function VehicleCard({ ad }: VehicleCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(ad.isFavorite);

  const handleCardClick = () => {
    router.push(`/${ad.slug}`);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (navigator.share) {
      navigator.share({
        title: ad.vehicleModel.name,
        url: `${window.location.origin}/ads/${ad.slug}`,
      });
    }
  };

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    await toggleFavoriteAction(ad.id);
  };
  return (
    <div onClick={handleCardClick} className= " cursor-pointer bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
    
      <div className="relative aspect-170/100 bg-slate-200 flex items-center justify-center overflow-hidden">
      
        <img
          src={getImageUrl(ad.thumbnail)}
          alt={ad.slug}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-3 space-y-2" dir="rtl">
        <h3 className="text-base font-bold text-slate-800 truncate">
         {ad.vehicleModel.name} - {ad.manufactureYear}
        </h3>

        <div className="flex flex-col items-start gap-1">
          <span className="text-lg font-black text-slate-900 leading-none">
             ${ad.price.toLocaleString()}
          </span>
          <div className="flex items-center gap-1 text-slate-500">
            <MapPin size={14} />
            <span className="text-xs font-bold">{ad.city.arabicName}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-50">
          <div className="flex gap-3 text-slate-400">
            <button 
              onClick={(e) => handleFavorite(e)}
              className={`transition-all active:scale-125 ${isFavorite ? "text-red-500" : "text-slate-300 hover:text-red-400"}`}
            >
              <Heart size={22} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={handleShare}
              className="text-slate-300 hover:text-blue-500 transition-colors active:scale-90"
            >
              <Share2 size={22} />
            </button>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span className="text-xs font-bold">{ad.viewsCount}</span>
            <Eye size={18} />
          </div>
        </div>
      </div>
    </div>
  );
  
}
