import { User, Phone } from "lucide-react";

export function SellerCard({ name, type, phone }: { name: string, type: string, phone: string }) {
  return (
    <section className="px-4">
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
            <User size={28} />
          </div>
          <div>
            <h3 className="font-black text-slate-800 text-lg">
              {name} <span className="text-xs text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded-lg">({type})</span>
            </h3>
            <div className="flex items-center gap-1 text-slate-500 font-bold mt-1">
              <Phone size={14} />
              <span dir="ltr" className="text-sm">{phone}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}