import VehicleDetailsPage from "./Components/DetailsPage";
import { notFound } from "next/navigation";
import { getAdBySlug } from "@/lib/actions/ads";
export default async function AdDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  try {
    // جلب البيانات من الـ API
    const adData = await getAdBySlug(slug);

    if (!adData.data) {
      return notFound();
    }

    return <VehicleDetailsPage data={adData.data} />;
  } catch (error) {
    console.error("Error fetching ad details:", error);
    return notFound();
  }
}
