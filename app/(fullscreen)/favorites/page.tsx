import { UnauthorizedBlock } from "@/components/UnauthorizedBlock";
import { AdsDataService } from "@/lib/services/adsDataService";
import { InfiniteFavoritesList } from "./InfiniteFavoritesList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeartOff } from "lucide-react";

export default async function FavoritesPage() {
  let initialAds = [];
  try {
    // جلب الصفحة الأولى (تأكد أن السيرفس تدعم تمرير رقم الصفحة)
    const response = await AdsDataService.getFavorites(1);

    if (response.status == 401) return <UnauthorizedBlock />;

    initialAds = response.data?.items || [];
  } catch (error: any) {
    if (error.message.includes("401")) return <UnauthorizedBlock />;
    return (
      <div className="text-center py-20 font-bold text-red-500">
        حدث خطأ أثناء تحميل البيانات.
      </div>
    );
  }

  return (
    <div className="py-2 space-y-8 max-w-full min-h-screen" dir="rtl">
      <section className="px-4">
        <div className="flex justify-between items-center mb-6 pt-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-800">
              إعلاناتي المفضلة
            </h2>
            <p className="text-xs text-slate-500 font-bold">
              الإعلانات التي نالت إعجابك
            </p>
          </div>
          {/* عرض العدد الإجمالي من البيانات الأولية (اختياري) */}
          <div className="bg-blue-50 border border-blue-100 text-blue-600 px-4 py-2 rounded-2xl text-sm font-black shadow-sm">
            المجموع: {initialAds.length}+
          </div>
        </div>

        {initialAds.length === 0 ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-6 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
              <HeartOff size={44} className="text-slate-300" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-700">
                قائمة الأمنيات فارغة
              </h3>

              <p className="text-slate-500 text-sm max-w-70 mx-auto leading-relaxed font-medium">
                يبدو أنك لم تختر أي مركبة بعد. تصفح الإعلانات وأضف ما يعجبك!
              </p>
            </div>

            <Link href="/">
              <Button className="h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-10 font-black transition-all active:scale-95 shadow-lg shadow-blue-100">
                استكشف السوق
              </Button>
            </Link>
          </div>
        ) : (
          <div className="pb-24">
            <InfiniteFavoritesList initialAds={initialAds} />
          </div>
        )}
      </section>
    </div>
  );
}
