export interface Summery {
  totalAds: number;
  pendingAds: number;
  monthlyRevenue: number;
}
export interface StatusData {
  status: string;
  count: number;
}
export interface GrowthData {
  month: string;
  ads: number;
}
export interface Stats {
  summary: Summery;
  growthData: GrowthData[];
  statusData: StatusData[];
}
export interface ModelResponse {
  id: number;
  name: string;
  category: string;
  manufacturerId: number;
}
export interface ManufacturerModelsResponse {
  id: number;
  name: string;
  models: ModelResponse[];
}
export interface PaymentRequest {
  id: number;
  packageName: string;
  packagePrice: number;
  paymentGatewayName: string;
  receiptImagePath: string;
  status: string;
  adminNote: string;
  userEmail: "yazan.ash.doonaas@gmail.com";
}
export interface PaymentGateway {
  id: number;
  name: string;
  accountNumber: string;
  instructions: string;
  isActive: boolean;
}
