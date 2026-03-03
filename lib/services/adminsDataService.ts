import { AdminUser } from "@/types/enums";
import { ApiResponse } from "../utils";
import { fetchApi } from "../api";

export const AdminsDataService = {
  getAdmins: async (): Promise<ApiResponse<AdminUser[]>> => {
    return fetchApi<AdminUser[]>(`/Admin/GetAdmins`, {
      cache: "no-store",
    });
  },
  checkAdmin: async (): Promise<ApiResponse<any>> => {
    return fetchApi<any>(`/Admin/CheckAdminStatus`, {
      cache: "no-cache",
    });
  },
  addAdminRole: async (email: string): Promise<ApiResponse<any>> => {
    return fetchApi<any>("/Admin/AddAdminRole", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },
  revokeAdmin: async (id: string): Promise<ApiResponse<any>> => {
    return fetchApi<any>(`/Admin/RevokeAdmin/${id}`, {
      method: "DELETE",
    });
  },
};
