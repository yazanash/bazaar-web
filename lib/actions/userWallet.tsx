import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function getUserWallet() {
  const response = await api.getUserWallet();
  return response;
}