"use server";
import { api } from "@/lib/api";
import { ProfileData } from "@/types/profile";
import { revalidatePath } from "next/cache";

export async function saveProfileAction(
  formData: ProfileData,
  isUpdate: boolean,
) {
  try {
    if (isUpdate) {
      await api.updateProfile(formData);
    } else {
      await api.createProfile(formData);
    }
    revalidatePath("/profile");
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}
export async function getProfileAction() {
  try {
    const data = await api.getProfile(); 
    return { success: true, data }; 
  } catch (e) {
    return { success: false, data: null };
  }
}