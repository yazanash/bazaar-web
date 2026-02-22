import { api } from "@/lib/api";
import { VehicleCard } from "@/components/CustomerComponents/home/VehicleCard";
import SearchHeader from "@/components/forms/SearchForms/SearchHeader";
import { VehicleAdResponse } from "@/types/ad";
import { Search } from "lucide-react";
export default async function SearchPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const params = await searchParams;
  const hasFilters = Object.keys(params).length > 0;
  let ads: VehicleAdResponse[] = [];
  if (hasFilters) {
    const query = new URLSearchParams(params).toString();
    const response = await api.searchAds(query);
    ads = response.data?.items??[];
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20" dir="rtl">
      <SearchHeader />

      <main className="p-4">
        {!hasFilters ? (
          <div className="flex flex-col items-center justify-center pt-20 text-center space-y-4">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
              <Search size={40} className="text-blue-200" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800">
                ابدأ البحث عن مركبتك
              </h3>
              <p className="text-slate-400 font-bold text-sm mt-1">
                استخدم الفلاتر في الأعلى لتخصيص بحثك
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ads.map((ad: VehicleAdResponse) => (
              <VehicleCard key={ad.id} ad={ad} />
            ))}
            {ads.length === 0 && (
              <p className="col-span-full text-center py-20 font-bold text-slate-400">
                عذراً، لم نجد نتائج تطابق بحثك.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
