import {
  Masters,
  PaginatedResponse,
  UserAdsResponse,
  VehicleAdDetailsResponse,
  VehicleAdRequest,
  VehicleAdResponse,
} from "@/types/ad";
import { fetchApi } from "../api";
import { ApiResponse } from "../utils";
import { PubStatus } from "@/types/enums";

export const AdsDataService = {
  getHomeAds: async (
    page = 1,
  ): Promise<ApiResponse<PaginatedResponse<VehicleAdResponse>>> => {
    return fetchApi<PaginatedResponse<VehicleAdResponse>>(
      `/ads/home?pageNumber=${page}&pageSize=10`,
      {
        next: { revalidate: 60 },
      },
    );
  },
  getPendingAds: async (): Promise<
    ApiResponse<PaginatedResponse<VehicleAdResponse>>
  > => {
    return fetchApi<PaginatedResponse<VehicleAdResponse>>(
      `/Ads/GetAdsByStatus?PubStatus=pending`,
      {
        next: { revalidate: 60 },
      },
    );
  },
  getUserAds: async (
    page = 1,
  ): Promise<ApiResponse<PaginatedResponse<UserAdsResponse>>> => {
    return fetchApi<PaginatedResponse<UserAdsResponse>>(
      `/MyAds?pageNumber=${page}&pageSize=10`,
      {
        next: { revalidate: 60 },
      },
    );
  },

  getAdBySlug: async (
    slug: string,
  ): Promise<ApiResponse<VehicleAdDetailsResponse>> => {
    return fetchApi<VehicleAdDetailsResponse>(`/ads/ad/${slug}`, {
      cache: "no-store",
    });
  },
  getAdById: async (id: number): Promise<ApiResponse<VehicleAdRequest>> => {
    return fetchApi<VehicleAdRequest>(`/myads/${id}`, {
      cache: "no-store",
    });
  },

  searchAds: async (
    queryString: string,
  ): Promise<ApiResponse<PaginatedResponse<VehicleAdResponse>>> => {
    return fetchApi<PaginatedResponse<VehicleAdResponse>>(
      `/ads/search?${queryString}`,
      {
        cache: "no-store",
      },
    );
  },
  getFavorites: async (): Promise<
    ApiResponse<PaginatedResponse<VehicleAdResponse>>
  > => {
    return fetchApi<PaginatedResponse<VehicleAdResponse>>("/ads/favorites", {
      cache: "no-store",
    });
  },
  getMasters: async (): Promise<ApiResponse<Masters>> => {
    return fetchApi<Masters>("/Masters", {
      cache: "no-store",
    });
  },
  toggleFavorite: async (
    id: number,
  ): Promise<ApiResponse<{ message: string }>> => {
    return fetchApi<{ message: string }>("/Ads/Like", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
  },
  changeAdStatus: async (
    status: PubStatus,
    reason: string,
  ): Promise<ApiResponse<any>> => {
    return fetchApi<{ message: string }>("/Ads/Like", {
      method: "POST",
      body: JSON.stringify({
        pubStatus: status,
        reasone: status === PubStatus.Rejected ? reason : "",
      }),
    });
  },
  createAd: async (
    payload: VehicleAdRequest,
  ): Promise<ApiResponse<{ message: string }>> => {
    return fetchApi<{ message: string }>("/MyAds", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  updateAd: async (
    id: number,
    payload: VehicleAdRequest,
  ): Promise<ApiResponse<{ message: string }>> => {
    return fetchApi<{ message: string }>(`/MyAds/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },
  uploadImage: async (
    formData: FormData,
  ): Promise<ApiResponse<{ imageUrl: string }>> => {
    return fetchApi<{ imageUrl: string }>("/MyAds/upload-image", {
      method: "POST",
      body: formData,
    });
  },
  deleteAdById: async (id: number): Promise<ApiResponse<{}>> => {
    return fetchApi<{}>(`/MyAds/${id}`, {
      method: "DELETE",
    });
  },
};
