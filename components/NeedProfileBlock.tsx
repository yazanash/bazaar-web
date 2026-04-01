import { LockKeyhole, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function NeedProfileBlock() {
  const t = useTranslations("needProfile");
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <LockKeyhole size={48} className="text-blue-600" />
      </div>

      <h2 className="text-2xl font-black text-slate-800 mb-2">{t("title")}</h2>
      <p className="text-slate-500 text-sm max-w-75 mb-8 leading-relaxed font-medium">
        {t("description")}
      </p>

      <div className="flex flex-col w-full max-w-70 gap-3">
        <Link href="/profile" className="w-full">
          <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-200">
            <LogIn className="ml-2" size={20} /> {t("action")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
