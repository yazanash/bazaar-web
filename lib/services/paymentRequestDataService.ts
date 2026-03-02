import { fetchApi } from "../api";
import { ApiResponse } from "../utils";

export const PaymentRequestDataService = {
  getPaymentRequests: async (): Promise<ApiResponse<PaymentRequest[]>> => {
    return fetchApi<PaymentRequest[]>(`/PaymentRequest`, {
      next: { revalidate: 60 },
    });
  },

};
