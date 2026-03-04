"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { VehicleCard } from "@/components/CustomerComponents/home/VehicleCard";
import { AdsDataService } from "@/lib/services/adsDataService"; // تأكد من توفرها في الكلاينت أو عمل API Route
import { Loader2 } from "lucide-react";

export function InfiniteAdsList({ initialAds }: { initialAds: any[] }) {
  const [ads, setAds] = useState(initialAds);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMoreAds();
    }
  }, [inView, hasMore, isLoading]);

  const loadMoreAds = async () => {
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const response = await AdsDataService.getHomeAds(nextPage);
      const newAds = response.data?.items || [];

      if (newAds.length === 0) {
        setHasMore(false);
      } else {
        setAds((prev) => [...prev, ...newAds]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more ads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ads.map((ad) => (
          <VehicleCard key={ad.id} ad={ad} />
        ))}
      </div>

      {/* العنصر المراقب في نهاية الصفحة */}
      <div ref={ref} className="py-10 flex justify-center">
        {isLoading && (
          <Loader2 className="animate-spin text-blue-600" size={32} />
        )}
        {!hasMore && ads.length > 0 && (
          <p className="text-slate-400 text-sm font-bold">
            وصلت إلى نهاية النتائج
          </p>
        )}
      </div>
    </>
  );
}
