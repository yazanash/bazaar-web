import VehicleDetailsPage from "@/components/AdDetailsComponents/DetailsPage";
import { getAdBySlug } from "@/lib/actions/ads";
import { notFound } from "next/navigation";
import AdminApprovalActions from "@/components/AdminComponents/AdminApprovalActions";
import AdminVehicleReview from "./AdminVehicleReview";

export default async function AdminAdReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const adData = await getAdBySlug(slug);
  if (adData.status == 404) return notFound();
if(!adData.data){
  return <h1>no data</h1>
}
  return (
    <div className="min-h-screen bg-slate-50">
      {/* هيدر التحكم الثابت للأدمن */}
      <div className="sticky top-0 z-120 bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 shadow-sm">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col">
            <h1 className="font-black text-slate-900 text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              مراجعة الإعلان: {adData.data?.name}
            </h1>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Reference ID: #{adData.data?.id}
            </span>
          </div>

          {/* نقلنا الأزرار لهون */}
          <AdminApprovalActions adId={adData.data?.id ?? 0} />
        </div>
      </div>

      {/* منطقة العرض - سحبنا منها الـ pointer-events لمنع التفاعل المزعج */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-200 bg-white relative">
          {/* طبقة حماية لمنع الأدمن من الضغط على أزرار الزبون بالخطأ */}
          <div className="absolute inset-0 z-10 pointer-events-none border-12 border-white rounded-[3rem]" />

          <div className="max-w-5xl mx-auto py-8 px-4">
            <AdminVehicleReview data={adData.data} />
          </div>
        </div>
      </div>
    </div>
  );
}
