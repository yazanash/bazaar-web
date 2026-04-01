import { api } from "@/lib/api";
import { VehicleCard } from "@/components/CustomerComponents/home/VehicleCard";
import SearchHeader from "@/components/forms/SearchForms/SearchHeader";
import { VehicleAdResponse } from "@/types/ad";
import { Search } from "lucide-react";
import { AdsDataService } from "@/lib/services/adsDataService";
import { InfiniteSearchList } from "./InfiniteSearchList";
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<any>; 
}) {
  const params = await searchParams;
  const hasFilters = Object.keys(params).length > 0;
  let initialAds: VehicleAdResponse[] = [];
  const queryString = new URLSearchParams(params).toString();

  if (hasFilters) {
    const response = await AdsDataService.searchAds(queryString);
    initialAds = response.data?.items ?? [];
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
            <h3 className="text-xl font-black text-slate-800">ابدأ البحث عن مركبتك</h3>
          </div>
        ) : (
          <div className="pb-20">
            <InfiniteSearchList 
                initialAds={initialAds} 
                currentQuery={queryString} 
            />
          </div>
        )}
      </main>
    </div>
  );
}