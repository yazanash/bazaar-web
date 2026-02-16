import {
  MapPin,
  Calendar,
  Heart,
  Share2,
  Clock,
  GroupIcon
} from "lucide-react";
import { ArabicLabels, Category } from "@/types/enums";
import { VehicleAdDetailsResponse } from "@/types/ad";
export function BasicInfoCard({ data }: { data: VehicleAdDetailsResponse }) {
  return (
    <section className="px-4">
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-xl font-black text-slate-800">
              {data.vehicleModel?.name}
            </h1>
            <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
              <span className="flex items-center gap-1">
                <GroupIcon size={14} /> {ArabicLabels.Category[data.category as Category]}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {data.city?.arabicName}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} /> {data.manufactureYear}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-slate-50 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
              <Heart
                size={20}
                fill={data.isFavorite ? "currentColor" : "none"}
              />
            </button>
            <button className="p-2 bg-slate-50 rounded-full hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-end mt-6">
          <div className="text-3xl font-black text-blue-600">
            ${data.price?.toLocaleString()}
          </div>
          <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
            <Clock size={12} />
          </div>
        </div>
       
      </div>
    </section>
  );
}
