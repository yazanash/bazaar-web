"use server";

import { api } from "@/lib/api";
import { VehicleAdRequest } from "@/types/ad";
import { revalidatePath } from "next/cache";

export async function toggleFavoriteAction(adId: number) {
  const response = await api.toggleFavorite(adId);
  revalidatePath("/favorites");
  revalidatePath("/");
  return response;
}
export async function getAdBySlug(slug: string) {
  const response = await api.getAdBySlug(slug);
  return response;
}

export async function createAd(payload: VehicleAdRequest) {
  const response = await api.createAd(payload);
  revalidatePath("/myads");
  revalidatePath("/");
  return response;
}
export async function updateAd(id: number, payload: VehicleAdRequest) {
  const response = await api.updateAd(id, payload);
  revalidatePath("/myads");
  revalidatePath("/");
  return response;
}

export async function uploadImage(formData: FormData) {
  const response = await api.uploadImage(formData);
  return response;
}

export async function getUserAds() {
  const response = await api.getUserAds();
  return response;
}

export async function getAdById(id: number) {
  const response = await api.getAdById(id);
  return response;
}

export async function deleteAdById(id: number) {
  const response = await api.deleteAdById(id);
  revalidatePath("/myads");
  revalidatePath("/");
  return response;
}
