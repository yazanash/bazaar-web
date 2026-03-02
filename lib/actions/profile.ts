"use server";
import { api } from "@/lib/api";
import { ProfileData } from "@/types/profile";
import { revalidatePath } from "next/cache";
import { ProfileDataService } from "../services/profileDataService";
export async function saveProfileAction(
  formData: ProfileData,
  isUpdate: boolean,
) {
  if (isUpdate) {
    const response = await ProfileDataService.updateProfile(formData);
    revalidatePath("/profile");
    return response;
  } else {
    const response = await ProfileDataService.createProfile(formData);
    revalidatePath("/profile");
    return response;
  }
}
export async function getProfileAction() {
  const response = await ProfileDataService.getProfile();
  return response;
}
