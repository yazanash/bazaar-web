import AddAdForm from "@/components/forms/adForms/AddAdForm";
import { getMasters } from "@/lib/actions/masterData";
import { getAdById } from "@/lib/actions/ads";
export default async function AddAdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const adData = await getAdById(Number(id));
  const master = await getMasters();
  if (!adData) {
    return <h1>Not found</h1>;
  }
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black text-slate-900">تعديل الاعلان</h1>
          <p className="text-slate-500 font-medium">
            قم بتعبئة التفاصيل لبيع مركبتك بأفضل سعر
          </p>
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
