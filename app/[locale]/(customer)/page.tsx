import { Categories } from "@/components/CustomerComponents/home/Categories";
import { api } from "@/lib/api";
import { VehicleCard } from "@/components/CustomerComponents/home/VehicleCard";
import { PromoSlider } from "@/components/CustomerComponents/home/PromoSlider";
import { Suspense } from "react";
import { AdBannersDataService } from "@/lib/services/adBannersDataService";
import { AdsDataService } from "@/lib/services/adsDataService";
import { InfiniteAdsList } from "./components/InfiniteAdsList";
import { getTranslations } from "next-intl/server";
export default async function HomePage() {
  const t = await getTranslations("common");

  try {
    const response = await AdsDataService.getHomeAds();
    const ads = response.data?.items;
    const adBannerResponse = await AdBannersDataService.getAdBanners();
    const adBanners = adBannerResponse.data ?? [];
    return (
      <div className="space-y-8 max-w-full">
        <PromoSlider adBanners={adBanners} />
        <Suspense fallback={<div>{t("loading")}</div>}>
          <Categories />
        </Suspense>
        <section className="px-4">
          <InfiniteAdsList initialAds={ads ?? []} />
        </section>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-10 text-center font-bold text-red-500">
        {t("error")}
      </div>
    );
  }
}
