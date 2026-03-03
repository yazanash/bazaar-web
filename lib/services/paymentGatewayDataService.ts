import { PaymentGateway } from "@/types/admin";
import { fetchApi } from "../api";
import { ApiResponse } from "../utils";

export const PaymentGatewayDataService = {
  getPaymentGateways: async (): Promise<ApiResponse<PaymentGateway[]>> => {
    return fetchApi<PaymentGateway[]>(`/PaymentGateways`, {
      cache: "no-store",
    });
  },
  createPaymentGateway: async (
    gateway: PaymentGateway,
  ): Promise<ApiResponse<PaymentGateway>> => {
    return fetchApi<PaymentGateway>("/PaymentGateways", {
      method: "POST",
      body: JSON.stringify(gateway),
    });
  },

  updatePaymentGateway: async (
    gateway: PaymentGateway,
  ): Promise<ApiResponse<PaymentGateway>> => {
    return fetchApi<PaymentGateway>(`/PaymentGateways/${gateway.id}`, {
      method: "PUT",
      body: JSON.stringify(gateway),
    });
  },
};
