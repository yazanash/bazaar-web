"use server";

import { api } from "../api";
import { AdsDataService } from "../services/adsDataService";
export async function getMasters() {
  const response = await AdsDataService.getMasters();
  return response;
}
