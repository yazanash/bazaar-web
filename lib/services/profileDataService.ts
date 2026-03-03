import { ProfileData, UserWalletResponse } from "@/types/profile";
import { fetchApi } from "../api";
import { ApiResponse } from "../utils";

export const ProfileDataService = {
  getProfile: async () => fetchApi<ProfileData>("/Profile"),
  updateProfile: async (data: ProfileData) =>
    fetchApi("/Profile", { method: "PUT", body: JSON.stringify(data) }),
  createProfile: async (data: ProfileData) =>
    fetchApi("/Profile", { method: "POST", body: JSON.stringify(data) }),
  getUserWallet: async (): Promise<ApiResponse<UserWalletResponse>> => {
    return fetchApi<UserWalletResponse>(`/Packages/my`, {
      cache: "no-store",
    });
  },
};
