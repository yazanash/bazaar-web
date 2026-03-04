"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { VehicleCard } from "@/components/CustomerComponents/home/VehicleCard";
import { AdsDataService } from "@/lib/services/adsDataService";
import { Loader2 } from "lucide-react";
import { VehicleAdResponse } from "@/types/ad";

export function InfiniteSearchList({ 
  initialAds, 
  currentQuery 
}: { 
  initialAds: VehicleAdResponse[], 
  currentQuery: string 
}) {
  const [ads, setAds] = useState(initialAds);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const { ref, inView } = useInView();

  // مهم جداً: إذا تغير البحث (الـ Query)، نصفر كل شيء
  useEffect(() => {
    setAds(initialAds);
    setPage(1);
    setHasMore(true);
  }, [currentQuery, initialAds]);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      // ندمج رقم الصفحة مع الفلاتر الموجودة أصلاً في الـ Query
      const fullQuery = `${currentQuery}&pageNumber=${nextPage}`;
      const response = await AdsDataService.searchAds(fullQuery);
      const newAds = response.data?.items || [];

      if (newAds.length === 0) {
        setHasMore(false);
      } else {
        setAds((prev) => [...prev, ...newAds]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Search load more error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView) loadMore();
  }, [inView]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ads.map((ad) => (
          <VehicleCard key={ad.id} ad={ad} />
        ))}
        {ads.length === 0 && (
          <p className="col-span-full text-center py-20 font-bold text-slate-400">
            عذراً، لم نجد نتائج تطابق بحثك.
          </p>
        )}
      </div>

      <div ref={ref} className="py-10 flex justify-center">
        {isLoading && <Loader2 className="animate-spin text-blue-600" size={32} />}
      </div>
    </>
  );
}