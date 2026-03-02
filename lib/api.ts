import {
  CityResponse,
  ManufacturerResponse,
  Masters,
  PaginatedResponse,
  UserAdsResponse,
  VehicleAdDetailsResponse,
  VehicleAdRequest,
  VehicleAdResponse,
} from "@/types/ad";
import { AdBannerResponse } from "@/types/adBanner";
import { ProfileData, UserWalletResponse } from "@/types/profile";
import { cookies } from "next/headers";
import { ApiResponse } from "./utils";
import { Package } from "@/types/package";
import {
  PaymentGateway,
  PaymentRequest,
  Stats,
} from "@/types/admin";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
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
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    const status = res.status;
    let resultData = null;
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      resultData = await res.json();
    }

    if (!res.ok) {
      return {
        data: null,
        status: status,
        message: resultData?.message || `خطأ في الطلب: ${res.statusText}`,
        success: false,
      };
    }

    return {
      data: resultData as T,
      status: status,
      message: "تمت العملية بنجاح",
      success: true,
    };
  } catch (error: any) {
    return {
      data: null,
      status: 500,
      message: error.message || "حدث خطأ غير متوقع في الخادم",
      success: false,
    };
  }
}

export const api = {
  getStats: async (): Promise<ApiResponse<Stats>> => {
    return fetchApi<Stats>(`/Stats`, {
      next: { revalidate: 60 },
    });
  },
};
