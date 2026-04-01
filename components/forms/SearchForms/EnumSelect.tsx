import { ArabicLabels, EnglishLabels } from "@/types/enums";
import { useLocale } from "next-intl";
interface EnumSelectProps {
  label: string;
  value: string | number;
  onChange: (val: any) => void;
  options: any[];
  enumKey: keyof typeof ArabicLabels;
}

export function EnumSelect({
  label,
  value,
  onChange,
  options,
  enumKey,
}: EnumSelectProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  return (
    <div className="space-y-2 text-right">
      <label className="text-xs font-bold text-slate-400 mr-2">{label}</label>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 outline-none font-bold text-slate-700 transition-all appearance-none shadow-sm"
      >
        <option value="">غير محدد</option>
        {options.map((optValue: string | number) => (
          <option key={optValue} value={optValue}>
            {isArabic
              ? ArabicLabels[enumKey][optValue as any] || optValue
              : EnglishLabels[enumKey][optValue as any] || optValue}
          </option>
        ))}
      </select>
    </div>
  );
}
