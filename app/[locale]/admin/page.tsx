
import StatsComponent from "@/components/AdminComponents/StatsComponent";
import { getStats } from "@/lib/actions/admin";

export default async function DashboardPage() {
  const response = await getStats();
  const stats = response.data;

  return (
    <StatsComponent stats={stats}/>
  );
}
