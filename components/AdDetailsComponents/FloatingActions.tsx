import { Phone, MessageCircle } from "lucide-react";
import { useLocale } from "next-intl";

export function FloatingActions({ phone }: { phone: string }) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl z-100 px-4 flex gap-3 pointer-events-none">
      <a
        href={`tel:${phone}`}
        className="flex-1 pointer-events-auto h-16 bg-blue-600 text-white rounded-[2rem] font-black shadow-xl shadow-blue-200 flex items-center justify-center gap-3 active:scale-95 transition-transform"
      >
        <div className="bg-white/20 p-2 rounded-full">
          <Phone size={20} />
        </div>
        {isArabic ? "اتصال" : "Call"}
      </a>

      <a
        href={`https://wa.me/${phone}`}
        className="flex-1 pointer-events-auto h-16 bg-[#25D366] text-white rounded-[2rem] font-black shadow-xl shadow-green-200 flex items-center justify-center gap-3 active:scale-95 transition-transform"
      >
        <div className="bg-white/20 p-2 rounded-full">
          <MessageCircle size={20} />
        </div>
        {isArabic ? "واتساب" : "Whatsapp"}
      </a>
    </div>
  );
}
