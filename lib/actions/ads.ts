// lib/actions/ads.ts
"use server";

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function toggleFavoriteAction(adId: number) {
  try {
    await api.toggleFavorite(adId);
    // تحديث الكاش لصفحة المفضلة والصفحة الرئيسية لضمان مزامنة البيانات
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
   return { success: true, data:null }; 
  }
}