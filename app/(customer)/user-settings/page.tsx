import { logoutAction } from "@/lib/actions/auth";
import { User, ShieldCheck, LogOut, ChevronLeft } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getProfileAction } from "@/lib/actions/profile";
import { UnauthorizedBlock } from "@/components/UnauthorizedBlock";
import WalletCard from "@/components/UserWallet";
import { getUserWallet } from "@/lib/actions/userWallet";
import UserSettingsComp from "@/components/UserSettingsComp";
import { checkAdmin } from "@/lib/actions/admin";
export default async function SettingsPage() {
  const result = await getProfileAction();
  const walletResult = await getUserWallet();
  const wallet = walletResult.data;
  const admin = await checkAdmin();

  const isAdmin = admin.success;

  if (result.status == 401) {
    return <UnauthorizedBlock />;
  }
  if (result.status == 404) {
    redirect("/profile");
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4" dir="rtl">
      <div className="flex items-center justify-between mb-6 px-2">
        <h1 className="text-2xl font-black text-slate-900">الإعدادات</h1>

        {/* زر الإدارة المختصر - يظهر فقط للأدمن */}
        {isAdmin && (
          <Link
            href="/admin"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-2xl font-black text-xs shadow-lg shadow-blue-200 active:scale-95 transition-all"
          >
            <ShieldCheck size={16} />
            لوحة التحكم
          </Link>
        )}
      </div>
      {isAdmin && (
        <Link href="/admin" className="group block mb-6">
          <div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-2xl shadow-slate-200">
            {/* زخرفة خلفية */}
            <ShieldCheck
              size={120}
              className="absolute -left-8 -bottom-8 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-500"
            />

            <div className="relative z-10 flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  صلاحيات كاملة
                </span>
                <h2 className="text-xl font-black">إدارة النظام</h2>
                <p className="text-slate-400 text-xs font-bold mt-1">
                  الدخول إلى الإحصائيات، المستخدمين، والإعلانات
                </p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <ChevronLeft size={24} />
              </div>
            </div>
          </div>
        </Link>
      )}
      {wallet && <WalletCard UserWallet={wallet} />}
      <UserSettingsComp />
    </div>
  );
}
