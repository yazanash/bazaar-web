"use server";

import { api } from "@/lib/api";
import { VehicleAdRequest } from "@/types/ad";
import { revalidatePath } from "next/cache";
import { AdsDataService } from "../services/adsDataService";
export async function toggleFavoriteAction(adId: number) {
  const response = await AdsDataService.toggleFavorite(adId);
  revalidatePath("/favorites");
  revalidatePath("/");
  return response;
}
export async function getAdBySlug(slug: string) {
  const response = await AdsDataService.getAdBySlug(slug);
  return response;
}

export async function createAd(payload: VehicleAdRequest) {
  const response = await AdsDataService.createAd(payload);
  revalidatePath("/myads");
  revalidatePath("/");
  return response;
}
export async function updateAd(id: number, payload: VehicleAdRequest) {
  const response = await AdsDataService.updateAd(id, payload);
  revalidatePath("/myads");
  revalidatePath("/");
  return response;
}

export async function uploadImage(formData: FormData) {
  const response = await AdsDataService.uploadImage(formData);
  return response;
}

export async function getUserAds(nextPage: number) {
  const response = await AdsDataService.getUserAds(nextPage);
  return response;
}

export async function getAdById(id: number) {
  const response = await AdsDataService.getAdById(id);
  return response;
}

export async function deleteAdById(id: number) {
  const response = await AdsDataService.deleteAdById(id);
  revalidatePath("/myads");
  revalidatePath("/");
  return response;
}

export async function checkPostPrivileges() {
  const response = await AdsDataService.checkPostPrivileges();
  return response;
}
