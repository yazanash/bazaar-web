import { CityResponse, PaginatedResponse } from "@/types/ad";
import { fetchApi } from "../api";
import { ApiResponse } from "../utils";

export const CityDataService = {
  getCities: async (): Promise<ApiResponse<CityResponse[]>> => {
    return fetchApi<CityResponse[]>(`/Cities`, {
      next: { revalidate: 60 },
    });
  },

  createCity: async (
    city: CityResponse,
  ): Promise<ApiResponse<CityResponse>> => {
    return fetchApi<CityResponse>("/Cities", {
      method: "POST",
      body: JSON.stringify(city),
    });
  },

  updateCity: async (
    city: CityResponse,
  ): Promise<ApiResponse<CityResponse>> => {
    return fetchApi<CityResponse>(`/Cities/${city.id}`, {
      method: "PUT",
      body: JSON.stringify(city),
    });
  },
};
