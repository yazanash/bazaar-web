import CitiesManagement from "@/components/AdminComponents/CityList";
import { getCities } from "@/lib/actions/admin";

export default async function CitiesManagementPage() {
  const response = await getCities();

  return <CitiesManagement initialCities={response.data ?? []} />;
}
