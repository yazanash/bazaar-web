"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Search, FilterX, Calendar, Loader2 } from "lucide-react";
import { VehicleAdResponse } from "@/types/ad";
import { getImageUrl } from "@/lib/utils";
import { getPendingAds } from "@/lib/actions/admin";
import { useInView } from "react-intersection-observer";
interface AdsProps {
  initialAds: VehicleAdResponse[];
}

export default function AdsList({ initialAds }: AdsProps) {
  const router = useRouter();
  const [ads, setAds] = useState(initialAds);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  if (!ads) {
    return <h1>No Data</h1>;
  }
  const { ref, inView } = useInView();

  // ميثود جلب المزيد
  const loadMoreAds = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const response = await getPendingAds(nextPage);
      const newItems = response.data?.items || [];

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setAds((prev) => [...prev, ...newItems]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to load ads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreAds();
    }
  }, [inView]);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">إدارة الإعلانات</h1>
        <p className="text-slate-500 font-bold mt-1">
          ابحث، فلتر، وراجع المنشورات
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="group bg-white p-3 md:p-4 rounded-[2.2rem] border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col md:flex-row items-center gap-5"
          >
            <div className="relative w-full md:w-44 h-32 shrink-0 rounded-[1.5rem] bg-slate-50 overflow-hidden border border-slate-50">
              <img
                src={getImageUrl(ad.thumbnail) || "/placeholder-car.png"} // تأكد من مسار الصور عندك
                alt={ad.slug}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* ملصق الحالة فوق الصورة */}
              {/* <div className="absolute top-2 right-2">
                <StatusBadge
                  status={ad.s}
                  className="shadow-sm scale-90"
                />
              </div> */}
            </div>

            {/* 2. تفاصيل السيارة */}
            <div className="flex-1 flex flex-col gap-1 w-full text-right">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded-lg">
                  AD #{ad.id}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                  {ad.city?.arabicName || "كل المدن"}
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                {ad.vehicleModel.name}
              </h3>

              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  <Calendar size={14} className="text-slate-300" />
                  {/* {new Date(ad.pos).toLocaleDateString("ar-EG")} */}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end md:px-6 w-full md:w-auto">
              <span className="text-[9px] font-black text-slate-400 uppercase mb-1">
                السعر المطلوب
              </span>
              <div className="text-xl font-black text-blue-600 tracking-tight">
                {ad.price.toLocaleString()}
                <span className="text-xs mr-1 font-bold text-blue-400">$</span>
              </div>
            </div>

            <div className="w-full md:w-auto shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-50">
              <Button
                onClick={() => router.push(`/admin/ads/${ad.slug}`)}
                className="w-full md:w-32 h-14 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-black text-sm shadow-lg shadow-slate-100 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Eye size={18} />
                مراجعة
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div ref={ref} className="py-10 flex justify-center">
        {isLoading && (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin text-blue-600" size={32} />
            <span className="text-xs text-slate-400 font-bold">
              جاري تحميل المزيد...
            </span>
          </div>
        )}
        {!hasMore && ads.length > 0 && (
          <p className="text-slate-400 font-bold text-sm italic">
            لا يوجد مزيد من الإعلانات المعلقة
          </p>
        )}
      </div>
    </div>
  );
}

// مكون Badge الحالة
function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    pending: {
      label: "قيد المراجعة",
      className: "bg-amber-50 text-amber-600 border-amber-100",
    },
    accepted: {
      label: "تم القبول",
      className: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    rejected: {
      label: "مرفوض",
      className: "bg-red-50 text-red-600 border-red-100",
    },
  };
  const config = configs[status];
  return (
    <Badge
      variant="outline"
      className={`rounded-lg px-3 py-1 font-bold ${config.className}`}
    >
      {config.label}
    </Badge>
  );
}
