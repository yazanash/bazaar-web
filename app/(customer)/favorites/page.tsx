import { api } from "@/lib/api"; 
import { VehicleCard } from "@/components/CustomerComponents/home/VehicleCard";
import { HeartOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UnauthorizedBlock } from "@/components/UnauthorizedBlock";

export default async function FavoritesPage() {

  let favoritesData = null;
  try {
    favoritesData = await api.getFavorites();
  } catch (error:any) {
    if (error.message.includes("401")) {
      return <UnauthorizedBlock />;
    }
    return <div className="text-center py-20 font-bold text-red-500">حدث خطأ أثناء تحميل البيانات.</div>;
  }

  const ads = favoritesData?.items || [];

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
          <div className="bg-blue-50 border border-blue-100 text-blue-600 px-4 py-2 rounded-2xl text-sm font-black shadow-sm">
            {ads.length} إعلان
          </div>
        </div>

        {ads.length === 0 ? (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24 font-bold">
            {ads.map((ad) => (
              <VehicleCard key={ad.id} ad={ad} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
