import { Categories } from "@/components/CustomerComponents/home/Categories";
import { api } from "@/lib/api";
import { VehicleCard } from "@/components/CustomerComponents/home/VehicleCard";
import { PromoSlider } from "@/components/CustomerComponents/home/PromoSlider";
import { Suspense } from "react";
export default async function HomePage() {
  try {
    const response = await api.getHomeAds();
    const ads = response.data?.items;
    const adBannerResponse = await api.getAdBanners();
    const adBanners = adBannerResponse.data ?? [];
    return (
      <div className="space-y-8 max-w-full">
        <PromoSlider adBanners={adBanners} />
        <Suspense fallback={<div>جاري التحميل...</div>}>
          <Categories />
        </Suspense>
        <section className="px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-black text-slate-800">Special Ads</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-20">
            {ads?.map((ad) => (
              <VehicleCard key={ad.id} ad={ad} />
            ))}
          </div>
        </section>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-10 text-center font-bold text-red-500">
        عذراً، حدث خطأ أثناء تحميل البيانات.
      </div>
    );
  }
}
