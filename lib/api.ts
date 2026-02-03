const BASE_URL = "https://bazaar.runasp.net/api";

export async function getAllVehicles() {
  const response = await fetch(`${BASE_URL}/Ads`); 
  return response.json();
}

export async function getManufacturers() {
  const response = await fetch(`${BASE_URL}/Manufacturers`);
  return response.json();
}