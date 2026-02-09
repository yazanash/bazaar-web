import {
  PaginatedResponse,
  VehicleAdDetailsResponse,
  VehicleAdResponse,
} from "@/types/ad";
import { ProfileData } from "@/types/profile";
import { cookies } from "next/headers";
const BASE_URL = "https://bazaar.runasp.net/api";

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  let token: string | undefined;
  try {
    const cookieStore = await cookies();
    token = cookieStore.get("session_token")?.value;
  } catch (e) {}

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  if (!res.ok) {
    console.error(`API Error: ${res.status} - ${res.statusText}`);
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

  getAdBySlug: async (slug: string): Promise<VehicleAdDetailsResponse> => {
    return fetchApi<VehicleAdDetailsResponse>(`/ads/ad/${slug}`, {
      cache: "no-store",
    });
  },

  getManufacturers: async () => {
    return fetchApi<any[]>("/Manufacturers", {
      cache: "force-cache",
    });
  },

  getUserAds: async (token?: string): Promise<PaginatedResponse<any>> => {
    return fetchApi<PaginatedResponse<any>>("/ads/user-ads", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
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
  toggleFavorite: async (id: number): Promise<{ message: string }> => {
    return fetchApi<{ message: string }>("/Ads/Like", {
      method: "POST",
      body: JSON.stringify({ id }),
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
