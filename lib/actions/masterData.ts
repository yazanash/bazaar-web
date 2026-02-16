"use server";

import { api } from "../api";

export async function getMasters() {
  try {
    const data = await api.getMasters();
    return { success: true, data };
  } catch (error) {
    return { success: true, data: null };
  }
}
