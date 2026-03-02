import { getPackages } from "@/lib/actions/packages";
import PackagesList from "./PackageList";

export default async function PackagesPage() {
  const response = await getPackages();
  return <PackagesList packages={response.data ?? []} />;
}
