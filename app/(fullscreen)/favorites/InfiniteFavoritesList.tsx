"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { VehicleCard } from "@/components/CustomerComponents/home/VehicleCard";
import { AdsDataService } from "@/lib/services/adsDataService";
import { Loader2 } from "lucide-react";

export function InfiniteFavoritesList({ initialAds }: { initialAds: any[] }) {
  const [ads, setAds] = useState(initialAds);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView();

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const response = await AdsDataService.getFavorites(nextPage);
      const newAds = response.data?.items || [];

      if (newAds.length === 0) {
        setHasMore(false);
      } else {
        setAds((prev) => [...prev, ...newAds]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView) loadMore();
  }, [inView]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-bold">
        {ads.map((ad) => (
          <VehicleCard key={ad.id} ad={ad} />
        ))}
      </div>

      <div ref={ref} className="py-10 flex justify-center">
        {isLoading && (
          <Loader2 className="animate-spin text-blue-600" size={32} />
        )}
        {!hasMore && ads.length > 0 && (
          <p className="text-slate-400 text-xs font-bold italic">
            هذه كل إعلاناتك المفضلة
          </p>
        )}
      </div>
    </>
  );
}
