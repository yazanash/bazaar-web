import AddAdForm from "@/components/forms/adForms/AddAdForm";
import { NeedProfileBlock } from "@/components/NeedProfileBlock";
import { UnauthorizedBlock } from "@/components/UnauthorizedBlock";
import { getMasters } from "@/lib/actions/masterData";
import { getProfileAction } from "@/lib/actions/profile";
import { checkPostPrivileges } from "@/lib/actions/ads"; // افترضت اسم الأكشن هنا
import { AlertCircle, PackageCheck, Zap } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function AddAdPage() {
  const result = await getProfileAction();

  if (result.status == 401) return <UnauthorizedBlock />;
  if (result.status == 404) return <NeedProfileBlock />;

  // نطلب التحقق من الصلاحيات (الباقة، الرصيد، البروفايل)
  const privilege = await checkPostPrivileges();

  const master = await getMasters();
  const t = await getTranslations("ads");
  const tAdsLock = await getTranslations("adsLock");
  return (
    <main className="min-h-screen bg-slate-50 py-8 md:py-12 px-4 pb-32">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* هيدر الصفحة مع معلومات الباقة */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm gap-4">
          <div className="text-right">
            <h1 className="text-2xl font-black text-slate-900">{t("addAd")}</h1>
            <p className="text-slate-500 text-sm font-bold">
              {t("addAdBalance")} {privilege.data?.remainingAds}{" "}
              {t("addAdBalance2")}
            </p>
          </div>

          {privilege.data?.hasActivePackage && (
            <div className="flex items-center gap-3 bg-blue-50 px-5 py-3 rounded-2xl border border-blue-100">
              <PackageCheck className="text-blue-600" size={20} />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-blue-400 uppercase">
                  {tAdsLock("activePackage")}
                </span>
                <span className="text-xs font-black text-blue-700">
                  {tAdsLock("until")}{" "}
                  {new Date(privilege.data.expiryDate).toLocaleDateString(
                    "ar-EG",
                  )}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* منطق المنع أو السماح */}
        {!privilege.data?.canPost ? (
          <div className="bg-white rounded-[3rem] p-12 text-center border-2 border-dashed border-slate-200 flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500">
              <AlertCircle size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">
                {!privilege.data?.hasActivePackage
                  ? tAdsLock("noActive")
                  : tAdsLock("noBalance")}
              </h2>
            </div>
            <Link
              href="/packages"
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <Zap size={18} fill="currentColor" />
            { tAdsLock("chargeNow")}
            </Link>
          </div>
        ) : (
          <AddAdForm
            cities={master.data?.cities ?? []}
            models={master.data?.models ?? []}
            manufacturer={master.data?.manufacturer ?? []}
          />
        )}
      </div>
    </main>
  );
}
