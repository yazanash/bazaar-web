"use client";
import { Download, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // افترضت وجود shadcn
import { useTranslations } from "next-intl";

export function InstallAppBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const t = useTranslations("common");

  // يمكنك هنا إضافة منطق لاكتشاف إذا كان التطبيق مثبت مسبقاً أو إذا كان المستخدم على موبايل
  if (!isVisible) return null;

  return (
    <div className="mx-4 mt-4 bg-linear-to-r from-cyan-600 to-blue-700 rounded-2xl p-4 shadow-lg relative overflow-hidden group">
      {/* لمسة جمالية خلفية */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
            <Download className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm md:text-base">
              {t("installBanner.title") }
            </h3>
            <p className="text-cyan-100 text-xs mt-0.5">
              {t("installBanner.subtitle")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-white text-cyan-700 hover:bg-cyan-50 font-bold rounded-full px-5 shadow-sm"
            onClick={() => window.open("https://your-app-link.com", "_blank")}
          >
            {t("installBanner.button")}
          </Button>

          <button
            onClick={() => setIsVisible(false)}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
