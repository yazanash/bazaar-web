import { AdBannerResponse } from "@/types/adBanner";
import { fetchApi } from "../api";
import { ApiResponse } from "../utils";

export const AdBannersDataService = {

  getAdBanners: async (): Promise<ApiResponse<AdBannerResponse[]>> => {
    return fetchApi<AdBannerResponse[]>(`/AdBanners`, {
      cache: "no-store",
    });
  },

};
