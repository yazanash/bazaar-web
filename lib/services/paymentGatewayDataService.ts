import { PaymentGateway } from "@/types/admin";
import { fetchApi } from "../api";
import { ApiResponse } from "../utils";

export const PaymentGatewayDataService = {
  getPaymentGateways: async (): Promise<ApiResponse<PaymentGateway[]>> => {
    return fetchApi<PaymentGateway[]>(`/PaymentGateways`, {
      next: { revalidate: 60 },
    });
  },
};
