import { Package } from "@/types/package";
import { Check, Zap, Star, MessageCircle, LayoutGrid } from "lucide-react";
import { useTranslations } from "next-intl";

interface PackagesProps {
  packages: Package[];
}

export default function PackagesPage({ packages }: PackagesProps) {
  const t = useTranslations("packages");
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 pb-24" dir="rtl">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-black text-slate-900">{t("title")}</h1>
        <p className="text-sm text-slate-500 mt-2 font-bold">
          {t("description")}
        </p>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm relative overflow-hidden transition-all active:scale-[0.98]"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-lg font-black  text-blue-600`}>
                {pkg.name}
              </h3>
              <div className="text-left">
                <span className="text-2xl font-black text-slate-900">
                  {pkg.price}
                </span>
                <span className="text-base font-bold text-slate-400 mx-1">
                  $
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                  <LayoutGrid size={16} />
                </div>
                <span className="text-sm font-bold">
                  {t("adsCount")}{" "}
                  <span className="text-slate-900">{pkg.adLimits}</span>
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                  <Star size={16} />
                </div>
                <span className="text-sm font-bold">
                  {t("starredCount")}{" "}
                  <span className="text-slate-900">{pkg.featuredLimit}</span>
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* زر الشحن عبر تيليجرام */}
        <div className="mt-12 p-6 bg-blue-50 rounded-[2rem] border border-blue-100 text-center">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
            <MessageCircle size={24} />
          </div>
          <h4 className="text-blue-900 font-black mb-2">
            {" "}
            {t("needMoreCharge")}
          </h4>

          <a
            href="https://t.me/bazaar963_bot"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full h-14 bg-blue-600 text-white rounded-2xl font-black shadow-xl active:scale-95 transition-all"
          >
            <Zap size={20} className="fill-white" />
            {t("needMoreAction")}
          </a>
        </div>
      </div>
    </div>
  );
}
