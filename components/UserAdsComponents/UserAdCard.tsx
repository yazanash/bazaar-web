"use client";
import { useState } from "react"; // إضافة useState
import { MapPin, Eye, Heart, Rocket, Loader2 } from "lucide-react"; // إضافة Rocket
import { getImageUrl } from "@/lib/utils";
import { UserAdsResponse } from "@/types/ad";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // تأكد من تثبيت الـ Dialog من shadcn
import { Button } from "@/components/ui/button";
import { AdsDataService } from "@/lib/services/adsDataService";

export function UserAdCard({ ad }: { ad: UserAdsResponse }) {
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [isBoosting, setIsBoosting] = useState(false);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "accepted":
        return {
          label: "تم النشر",
          color: "bg-green-500",
          text: "تم قبول إعلانك وهو الآن ظاهر للجميع.",
        };
      case "pending":
        return {
          label: "قيد المعالجة",
          color: "bg-orange-400",
          text: "إعلانك قيد المراجعة من قبل الإدارة حالياً.",
        };
      case "rejected":
        return {
          label: "رفض الطلب",
          color: "bg-red-500",
          text: ad.reasone || "هناك مشكلة في محتوى الإعلان.",
        };
      default:
        return { label: "غير معروف", color: "bg-slate-400", text: "" };
    }
  };

  const status = getStatusConfig(ad.pubStatus);
  const vehicle = ad.vehicleAdResponse;

  const handleBoost = async () => {
    setIsBoosting(true);
    try {
       await AdsDataService.boostAd(vehicle.id);
      console.log("Boosting ad:", vehicle.id);
      setShowBoostModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsBoosting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit/${ad.vehicleAdResponse.id}`}
        className="cursor-pointer bg-white rounded-[2rem] p-3 shadow-sm border border-slate-100 mb-4 flex gap-4 relative overflow-hidden group hover:border-blue-200 transition-all"
      >
        <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-3xl">
          <img
            src={getImageUrl(vehicle.thumbnail)}
            className="w-full h-full object-cover"
            alt={vehicle.vehicleModel.name}
          />
          <div
            className={`absolute top-2 right-2 px-3 py-1 rounded-full text-[10px] font-black text-white ${status.color}`}
          >
            {status.label}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between py-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-black text-blue-900 leading-tight">
                {vehicle.vehicleModel.name} {vehicle.manufactureYear}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-slate-400 font-bold text-[11px]">
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {vehicle.city.arabicName}
                </span>
                <span className="flex items-center gap-1 font-black text-blue-600">
                  ${vehicle.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* زر الـ Boost */}
            {ad.pubStatus === "accepted" && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowBoostModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-2xl shadow-lg shadow-blue-100 transition-transform active:scale-90"
              >
                <Rocket size={18} />
              </button>
            )}
          </div>

          <div className="bg-slate-50 rounded-2xl p-2 mt-2 border border-slate-100">
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              {status.text}
            </p>
          </div>
          
          <div className="flex flex-row gap-3 mt-2 text-slate-500">
            <div className="flex items-center gap-1 text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded-lg">
              <Eye size={12} className="text-slate-400" /> {vehicle.viewsCount}
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded-lg">
              <Heart size={12} className="text-slate-400" /> {vehicle.favoritesCount}
            </div>
          </div>
        </div>
      </Link>

      {/* مودال التأكيد */}
      <Dialog open={showBoostModal} onOpenChange={setShowBoostModal}>
        <DialogContent className="rounded-[2.5rem] max-w-[90%] sm:max-w-100" dir="rtl">
          <DialogHeader className="text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Rocket size={32} className="text-blue-600" />
            </div>
            <DialogTitle className="text-2xl font-black text-slate-800">تمييز الإعلان</DialogTitle>
            <DialogDescription className="font-bold text-slate-500 pt-2">
              هل تريد تمييز هذا الإعلان ليظهر في النتائج الأولى ويصل لعدد أكبر من المشترين؟
              <br />
              <span className="text-blue-600 text-xs mt-2 block">سيتم خصم النقاط من محفظتك.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowBoostModal(false)}
              className="flex-1 h-12 rounded-2xl font-black border-slate-200"
            >
              إلغاء
            </Button>
            <Button
              onClick={handleBoost}
              disabled={isBoosting}
              className="flex-1 h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100"
            >
              {isBoosting ? <Loader2 className="animate-spin" /> : "تأكيد التمييز"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}