"use server";
import { api } from "@/lib/api";
import { ProfileData } from "@/types/profile";
import { revalidatePath } from "next/cache";

export async function saveProfileAction(
  formData: ProfileData,
  isUpdate: boolean,
) {
  if (isUpdate) {
    const response = await api.updateProfile(formData);
    revalidatePath("/profile");
    return response;
  } else {
    const response = await api.createProfile(formData);
    revalidatePath("/profile");
    return response;
  }
}
export async function getProfileAction() {
  const response = await api.getProfile();
  return response;
}
