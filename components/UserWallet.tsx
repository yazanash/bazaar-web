import { UserWalletResponse } from "@/types/profile";
import { Star, LayoutGrid, Calendar } from "lucide-react";

interface UserWalletProps {
  UserWallet: UserWalletResponse;
}

export default function WalletCard({ UserWallet }: UserWalletProps) {
  const formattedDate = new Date(UserWallet.expiryDate).toLocaleDateString('ar-SY', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit'
  });

  return (
    <div className="mb-5 bg-white border border-slate-100 rounded-2xl p-4 flex items-center shadow-sm">
      {/* 1. اللوغو عاليسار (أو اليمين حسب الـ RTL) */}
      <div className="shrink-0 w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
        <LayoutGrid size={20} /> 
      </div>

      {/* 2. المعلومات بالنص */}
      <div className="flex-1 flex justify-around items-center px-4 border-x border-slate-50 mx-4">
        {/* عدد الإعلانات */}
        <div className="text-center">
          <p className="text-[10px] text-slate-400 font-bold mb-0.5">الإعلانات</p>
          <span className="text-sm font-black text-slate-800">{UserWallet.adsLimit}</span>
        </div>

        {/* عدد التمييزات */}
        <div className="text-center">
          <p className="text-[10px] text-slate-400 font-bold mb-0.5">تمييز</p>
          <div className="flex items-center justify-center gap-1 text-amber-500">
            <Star size={12} fill="currentColor" />
            <span className="text-sm font-black text-slate-800">{UserWallet.featureLimits}</span>
          </div>
        </div>
      </div>

      {/* 3. تاريخ الانتهاء عالطرف الآخر */}
      <div className="shrink-0 text-left">
        <p className="text-[9px] text-slate-400 font-bold mb-0.5">صالحة حتى</p>
        <div className="flex items-center gap-1 text-slate-600">
          <Calendar size={12} className="text-slate-300" />
          <span className="text-[11px] font-bold tabular-nums">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}