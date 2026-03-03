import { PaymentRequest } from "@/types/admin";
import { fetchApi } from "../api";
import { ApiResponse } from "../utils";

export const PaymentRequestDataService = {
  getPaymentRequests: async (): Promise<ApiResponse<PaymentRequest[]>> => {
    return fetchApi<PaymentRequest[]>(`/PaymentRequest`, {
      cache: "no-cache",
    });
  },
  changePaymentRequest: async (
    id: number,
    status: string,
    adminNote: string,
  ): Promise<ApiResponse<{}>> => {
    return fetchApi<{}>(`/PaymentRequest/change-status/${id}`, {
      method: "POST",
      body: JSON.stringify({
        status,
        adminNote,
      }),
    });
  },
};
