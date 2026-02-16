// lib/actions/ads.ts
"use server";

import { api } from "@/lib/api";
import { VehicleAdRequest } from "@/types/ad";
import { revalidatePath } from "next/cache";

export async function toggleFavoriteAction(adId: number) {
  try {
    await api.toggleFavorite(adId);
    revalidatePath("/favorites");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
export async function getAdBySlug(slug: string) {
  try {
    const data = await api.getAdBySlug(slug);
    return { success: true, data };
  } catch (error) {
    return { success: true, data: null };
  }
}

export async function createAd(payload: VehicleAdRequest) {
  try {
    const data = await api.createAd(payload);
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: true, data: null };
  }
}
export async function updateAd(id:number,payload: VehicleAdRequest) {
  try {
    const data = await api.updateAd(id,payload);
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: true, data: null };
  }
}

export async function uploadImage(formData: FormData) {
  try {
    const data = await api.uploadImage(formData);
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: true, data: null };
  }
}

export async function getUserAds() {
  try {
    const data = await api.getUserAds();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: true, data: null };
  }
}

export async function getAdById(id: number) {
  try {
    const data = await api.getAdById(id);
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: true, data: null };
  }
}
