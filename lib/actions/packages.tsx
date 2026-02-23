import { api } from "../api";

export async function getPackages() {
  const response = await api.getPackages();
  return response;
}
