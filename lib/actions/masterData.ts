"use server";

import { api } from "../api";

export async function getMasters() {
  const response = await api.getMasters();
  return response;
}
