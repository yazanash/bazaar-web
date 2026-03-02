import { fetchApi } from "../api";
import { ApiResponse } from "../utils";

export const AuthDataService = {
  requestOtp: async (
    email: string,
  ): Promise<ApiResponse<{ message: string }>> => {
    return fetchApi<{ message: string }>("/Authentication/RequestOtp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  verifyOtp: async (
    email: string,
    otp: string,
  ): Promise<ApiResponse<{ token: string }>> => {
    return fetchApi<{ token: string }>("/Authentication/VerifyOtp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
  },
};
