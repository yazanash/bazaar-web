import { Package } from "@/types/package";
import { ApiResponse } from "../utils";
import { fetchApi } from "../api";

export const PackageDataService = {
  getPackages: async (): Promise<ApiResponse<Package[]>> => {
    return fetchApi<Package[]>(`/Packages`, {
      cache: "no-store",
    });
  },
  createPackage: async (newPackage: Package): Promise<ApiResponse<Package>> => {
    return fetchApi<Package>("/Packages", {
      method: "POST",
      body: JSON.stringify(newPackage),
    });
  },

  updatePackage: async (newPackage: Package): Promise<ApiResponse<Package>> => {
    return fetchApi<Package>(`/Packages/${newPackage.id}`, {
      method: "PUT",
      body: JSON.stringify(newPackage),
    });
  },
};
