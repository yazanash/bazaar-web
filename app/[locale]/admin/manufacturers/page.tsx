import ManufacturersList from "@/components/AdminComponents/ManufacturerList";
import { getManufacturers } from "@/lib/actions/admin";

export default async function ManufacturersPage() {
  const response = await getManufacturers();
  return <ManufacturersList manufacturers={response.data ?? []} />;
}
