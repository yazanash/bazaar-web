import {
  AdBannerAdminResponse,
  AdBannerRequest,
  AdBannerResponse,
} from "@/types/adBanner";
import { fetchApi } from "../api";
import { ApiResponse } from "../utils";

export const AdBannersDataService = {
  getAdBanners: async (): Promise<ApiResponse<AdBannerResponse[]>> => {
    return fetchApi<AdBannerResponse[]>(`/AdBanners`, {
      cache: "no-store",
    });
  },
  getAdminAdBanners: async (): Promise<
    ApiResponse<AdBannerAdminResponse[]>
  > => {
    return fetchApi<AdBannerAdminResponse[]>(`/AdBanners/admin`, {
      cache: "no-store",
    });
  },
  createAdBanner: async (formData: FormData): Promise<ApiResponse<any>> => {
    return fetchApi<any>("/AdBanners", {
      method: "POST",
      body: formData,
    });
  },

  updateAdBanner: async (
    id: number,
    formData: FormData,
  ): Promise<ApiResponse<any>> => {
    return fetchApi<any>(`/AdBanners/${id}`, {
      method: "PUT",
      body: formData,
    });
  },
};
