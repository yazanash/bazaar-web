"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { UserAdCard } from "@/components/UserAdsComponents/UserAdCard";
import { getUserAds } from "@/lib/actions/ads"; // تأكد أن الـ Action يستقبل رقم الصفحة
import { Loader2 } from "lucide-react";
import { UserAdsResponse } from "@/types/ad";

export function InfiniteUserAdsList({ initialItems }: { initialItems: UserAdsResponse[] }) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView();

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const response = await getUserAds(nextPage);
      const newItems = response.data?.items || [];

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...newItems]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading user ads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView) loadMore();
  }, [inView]);

  return (
    <div className="max-w-2xl mt-2 mx-auto space-y-4">
      {items.map((item) => (
        <UserAdCard key={item.vehicleAdResponse.id} ad={item} />
      ))}

      {/* منطقة المراقبة والتحميل */}
      <div ref={ref} className="py-8 flex justify-center">
        {isLoading && <Loader2 className="animate-spin text-blue-600" size={28} />}
        {!hasMore && items.length > 0 && (
          <p className="text-slate-400 text-xs font-bold italic">نهاية قائمة إعلاناتك</p>
        )}
      </div>
    </div>
  );
}