"use server";
import { CityResponse, ManufacturerResponse } from "@/types/ad";
import { api } from "../api";
import { CityDataService } from "../services/cityDataService";
import { ManufacturerDataService } from "../services/manufacturerDataService";
import { AdsDataService } from "../services/adsDataService";
import { PaymentGatewayDataService } from "../services/paymentGatewayDataService";
import { PaymentRequestDataService } from "../services/paymentRequestDataService";
import { ModelResponse, PaymentGateway } from "@/types/admin";
import { AdBannersDataService } from "../services/adBannersDataService";
import { AdBannerRequest } from "@/types/adBanner";
import { AdminsDataService } from "../services/adminsDataService";
import { PubStatus } from "@/types/enums";
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
export async function GetAdminAdBanners() {
  const response = await AdBannersDataService.getAdminAdBanners();
  return response;
}
export async function createAdBanner(formData: FormData) {
  const response = await AdBannersDataService.createAdBanner(formData);
  return response;
}
export async function updateAdBanner(id: number, formData: FormData) {
  const response = await AdBannersDataService.updateAdBanner(id, formData);
  return response;
}

export async function getAdmins() {
  const response = await AdminsDataService.getAdmins();
  return response;
}

export async function checkAdmin() {
  const response = await AdminsDataService.checkAdmin();
  return response;
}

export async function addAdminRole(email: string) {
  const response = await AdminsDataService.addAdminRole(email);
  return response;
}

export async function revokeAdmin(id: string) {
  const response = await AdminsDataService.revokeAdmin(id);
  return response;
}


export async function changeAdStatus(status: PubStatus,reason:string) {
  const response = await AdsDataService.changeAdStatus(status,reason);
  return response;
}