import { Phone, MessageCircle } from "lucide-react";

export function FloatingActions({ phone }: { phone: string }) {
  return (
    <div className="fixed bottom-6 left-4 right-4 z-[100] flex gap-3 pointer-events-none">
      <a 
        href={`tel:${phone}`} 
        className="flex-1 pointer-events-auto h-16 bg-blue-600 text-white rounded-[2rem] font-black shadow-xl shadow-blue-200 flex items-center justify-center gap-3 active:scale-95 transition-transform"
      >
        <div className="bg-white/20 p-2 rounded-full"><Phone size={20} /></div>
        اتصال
      </a>
      <a 
        href={`https://wa.me/${phone}`} 
        className="flex-1 pointer-events-auto h-16 bg-[#25D366] text-white rounded-[2rem] font-black shadow-xl shadow-green-200 flex items-center justify-center gap-3 active:scale-95 transition-transform"
      >
        <div className="bg-white/20 p-2 rounded-full"><MessageCircle size={20} /></div>
        واتساب
      </a>
    </div>
  );
}