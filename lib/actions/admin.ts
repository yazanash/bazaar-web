"use server";
import { CityResponse, ManufacturerResponse } from "@/types/ad";
import { api } from "../api";
import { CityDataService } from "../services/cityDataService";
import { ManufacturerDataService } from "../services/manufacturerDataService";
import { AdsDataService } from "../services/adsDataService";
import { PaymentGatewayDataService } from "../services/paymentGatewayDataService";
import { PaymentRequestDataService } from "../services/paymentRequestDataService";
import { ModelResponse, PaymentGateway } from "@/types/admin";
export async function getStats() {
  const response = await api.getStats();
  return response;
}

export async function getPendingAds() {
  const response = await AdsDataService.getPendingAds();
  return response;
}

export async function getCities() {
  const response = await CityDataService.getCities();
  return response;
}
export async function createCity(city: CityResponse) {
  const response = await CityDataService.createCity(city);
  return response;
}
export async function updateCity(city: CityResponse) {
  const response = await CityDataService.updateCity(city);
  return response;
}
export async function getManufacturers() {
  const response = await ManufacturerDataService.getManufacturers();
  return response;
}

export async function getManufacturer(id: number) {
  const response = await ManufacturerDataService.getManufacturer(id);
  return response;
}
export async function createManufacturers(manufacturer: ManufacturerResponse) {
  const response =
    await ManufacturerDataService.createManufacturers(manufacturer);
  return response;
}

export async function updateManufacturers(manufacturer: ManufacturerResponse) {
  const response =
    await ManufacturerDataService.updateManufacturers(manufacturer);
  return response;
}
export async function createManufacturerModel(manufacturer: ModelResponse) {
  const response =
    await ManufacturerDataService.createManufacturerModel(manufacturer);
  return response;
}

export async function updateManufacturerModel(manufacturer: ModelResponse) {
  const response =
    await ManufacturerDataService.updateManufacturerModel(manufacturer);
  return response;
}
export async function getPaymentRequests() {
  const response = await PaymentRequestDataService.getPaymentRequests();
  return response;
}
export async function changePaymentRequest(
  id: number,
  status: string,
  adminNote: string,
) {
  const response = await PaymentRequestDataService.changePaymentRequest(
    id,
    status,
    adminNote,
  );
  return response;
}

export async function getPaymentGateways() {
  const response = await PaymentGatewayDataService.getPaymentGateways();
  return response;
}
export async function createPaymentGateways(gateway: PaymentGateway) {
  const response =
    await PaymentGatewayDataService.createPaymentGateway(gateway);
  return response;
}

export async function updatePaymentGateways(gateway: PaymentGateway) {
  const response =
    await PaymentGatewayDataService.updatePaymentGateway(gateway);
  return response;
}
