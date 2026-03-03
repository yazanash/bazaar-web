import { ManufacturerResponse, PaginatedResponse } from "@/types/ad";
import { fetchApi } from "../api";
import { ApiResponse } from "../utils";
import { ManufacturerModelsResponse, ModelResponse } from "@/types/admin";

export const ManufacturerDataService = {
  getManufacturers: async (): Promise<ApiResponse<ManufacturerResponse[]>> => {
    return fetchApi<ManufacturerResponse[]>(`/Manufacturers`, {
      cache: "no-store",
    });
  },
  getManufacturer: async (
    id: number,
  ): Promise<ApiResponse<ManufacturerModelsResponse>> => {
    return fetchApi<ManufacturerModelsResponse>(`/Manufacturers/${id}`, {
      cache: "no-store",
    });
  },
  createManufacturers: async (
    manufcturer: ManufacturerResponse,
  ): Promise<ApiResponse<ManufacturerResponse>> => {
    return fetchApi<ManufacturerResponse>("/Manufacturers", {
      method: "POST",
      body: JSON.stringify(manufcturer),
    });
  },

  updateManufacturers: async (
    manufcturer: ManufacturerResponse,
  ): Promise<ApiResponse<ManufacturerResponse>> => {
    return fetchApi<ManufacturerResponse>(`/Manufacturers/${manufcturer.id}`, {
      method: "PUT",
      body: JSON.stringify(manufcturer),
    });
  },
  createManufacturerModel: async (
    model: ModelResponse,
  ): Promise<ApiResponse<ModelResponse>> => {
    return fetchApi<ModelResponse>("/VehicleModels", {
      method: "POST",
      body: JSON.stringify(model),
    });
  },

  updateManufacturerModel: async (
    model: ModelResponse,
  ): Promise<ApiResponse<ModelResponse>> => {
    return fetchApi<ModelResponse>(`/VehicleModels/${model.id}`, {
      method: "PUT",
      body: JSON.stringify(model),
    });
  },
};
