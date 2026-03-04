import AdsList from "@/components/AdminComponents/AdsList";
import { getPendingAds } from "@/lib/actions/admin";

export default async function AdsListPage() {
  const response = await getPendingAds(1);
  if (!response.data?.items || response.data.items.length === 0) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-xl font-bold text-slate-400">
          لا توجد إعلانات بانتظار المراجعة حالياً.
        </h1>
      </div>
    );
  }

  return <AdsList initialAds={response.data.items} />;
}
