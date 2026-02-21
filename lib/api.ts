import {
  Masters,
  PaginatedResponse,
  UserAdsResponse,
  VehicleAdDetailsResponse,
  VehicleAdRequest,
  VehicleAdResponse,
} from "@/types/ad";
import { AdBannerResponse } from "@/types/adBanner";
import { ProfileData } from "@/types/profile";
import { cookies } from "next/headers";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  let token: string | undefined;
  try {
    const cookieStore = await cookies();
    token = cookieStore.get("session_token")?.value;
  } catch (e) {}
  const headers: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options?.headers as any),
  };
  if (!(options?.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  if (!res.ok) {
    console.error(`API Error: ${res.status} - ${res.statusText} `);
    throw new Error(`API Error: ${res.status} - ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  getHomeAds: async (
    page = 1,
  ): Promise<PaginatedResponse<VehicleAdResponse>> => {
    return fetchApi<PaginatedResponse<VehicleAdResponse>>(
      `/ads/home?pageNumber=${page}&pageSize=10`,
      {
        next: { revalidate: 60 },
      },
    );
  },
  getUserAds: async (page = 1): Promise<PaginatedResponse<UserAdsResponse>> => {
    return fetchApi<PaginatedResponse<UserAdsResponse>>(
      `/MyAds?pageNumber=${page}&pageSize=10`,
      {
        next: { revalidate: 60 },
      },
    );
  },

  getAdBySlug: async (slug: string): Promise<VehicleAdDetailsResponse> => {
    return fetchApi<VehicleAdDetailsResponse>(`/ads/ad/${slug}`, {
      cache: "no-store",
    });
  },
  getAdById: async (id: number): Promise<VehicleAdRequest> => {
    return fetchApi<VehicleAdRequest>(`/myads/${id}`, {
      cache: "no-store",
    });
  },
  getAdBanners: async (): Promise<AdBannerResponse[]> => {
    return fetchApi<AdBannerResponse[]>(`/AdBanners`, {
      cache: "no-store",
    });
  },
  searchAds: async (
    queryString: string,
  ): Promise<PaginatedResponse<VehicleAdResponse>> => {
    return fetchApi<PaginatedResponse<VehicleAdResponse>>(
      `/ads/search?${queryString}`,
      {
        cache: "no-store",
      },
    );
  },
  getFavorites: async (): Promise<PaginatedResponse<VehicleAdResponse>> => {
    return fetchApi<PaginatedResponse<VehicleAdResponse>>("/ads/favorites", {
      cache: "no-store",
    });
  },
  getMasters: async (): Promise<Masters> => {
    return fetchApi<Masters>("/Masters", {
      cache: "no-store",
    });
  },
  toggleFavorite: async (id: number): Promise<{ message: string }> => {
    return fetchApi<{ message: string }>("/Ads/Like", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
  },
  createAd: async (payload: VehicleAdRequest): Promise<{ message: string }> => {
    return fetchApi<{ message: string }>("/MyAds", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  updateAd: async (
    id: number,
    payload: VehicleAdRequest,
  ): Promise<{ message: string }> => {
    return fetchApi<{ message: string }>(`/MyAds/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },
  uploadImage: async (formData: FormData): Promise<{ imageUrl: string }> => {
    return fetchApi<{ imageUrl: string }>("/MyAds/upload-image", {
      method: "POST",
      body: formData,
    });
  },
  deleteAdById: async (id: number): Promise<{}> => {
    return fetchApi<{}>(`/MyAds/${id}`, {
      method: "DELETE",
    });
  },
  requestOtp: async (email: string): Promise<{ message: string }> => {
    return fetchApi<{ message: string }>("/Authentication/RequestOtp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  verifyOtp: async (email: string, otp: string): Promise<{ token: string }> => {
    return fetchApi<{ token: string }>("/Authentication/VerifyOtp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
  },
  getProfile: async () => fetchApi<ProfileData>("/Profile"),
  updateProfile: async (data: ProfileData) =>
    fetchApi("/Profile", { method: "PUT", body: JSON.stringify(data) }),
  createProfile: async (data: ProfileData) =>
    fetchApi("/Profile", { method: "POST", body: JSON.stringify(data) }),
};
