import AddAdForm from "@/components/forms/adForms/AddAdForm";
import { getMasters } from "@/lib/actions/masterData";
import { getAdById } from "@/lib/actions/ads";
import { getTranslations } from "next-intl/server";
export default async function AddAdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const adData = await getAdById(Number(id));
  const master = await getMasters();
  const t = await getTranslations("ads");
  const tCommon = await getTranslations("common");
  if (adData.status == 404) {
    return <h1>{tCommon("noData")}</h1>;
  }
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black text-slate-900">{t("editAd")}</h1>
          <p className="text-slate-500 font-medium">{t("editAdDescription")}</p>
        </div>

        <AddAdForm
          cities={master.data?.cities ?? []}
          models={master.data?.models ?? []}
          manufacturer={master.data?.manufacturer ?? []}
          initialData={adData.data ?? undefined}
        />
      </div>
    </main>
  );
}
