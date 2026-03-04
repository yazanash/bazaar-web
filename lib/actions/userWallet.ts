import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { ProfileDataService } from "../services/profileDataService";
export async function getUserWallet() {
  const response = await ProfileDataService.getUserWallet();
  return response;
}
