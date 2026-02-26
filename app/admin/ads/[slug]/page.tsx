import VehicleDetailsPage from "@/components/AdDetailsComponents/DetailsPage";
import { getAdBySlug } from "@/lib/actions/ads";
import { notFound } from "next/navigation";
import AdminApprovalActions from "@/components/AdminComponents/AdminApprovalActions";

export default async function AdminAdReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  try {
    const adData = await getAdBySlug(slug);

    if (adData.status == 404) return notFound();

    return (
      <div className="relative">
        <div className="bg-white p-4 mb-4 rounded-2xl border border-slate-100 flex justify-between items-center">
          <h1 className="font-black text-slate-800">
            مراجعة إعلان: {adData.data?.name ?? ""}
          </h1>
          <div className="text-xs font-bold text-slate-400">
            ID: {adData.data?.id}
          </div>
        </div>

        <div className="pointer-events-none opacity-90 scale-[0.99] origin-top">
          <VehicleDetailsPage data={adData.data} />
        </div>

        <AdminApprovalActions adId={adData.data?.id ?? 0} />
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
