import { Package } from "@/types/package";
import { api } from "../api";
import { PackageDataService } from "../services/packageDataService";
export async function getPackages() {
  const response = await PackageDataService.getPackages();
  return response;
}
export async function createPackage(newPackage: Package) {
  const response = await PackageDataService.createPackage(newPackage);
  return response;
}
export async function updatePackage(newPackage: Package) {
  const response = await PackageDataService.updatePackage(newPackage);
  return response;
}
