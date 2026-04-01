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
import { getTranslations } from "next-intl/server";
export default async function SettingsPage() {
  const result = await getProfileAction();
  const walletResult = await getUserWallet();
  const wallet = walletResult.data;
  const admin = await checkAdmin();

  const isAdmin = admin.success;
  const t = await getTranslations("userSettings");
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
            {t("dashboard")}
          </Link>
        )}
      </div>
      {wallet && <WalletCard UserWallet={wallet} />}
      <UserSettingsComp />
    </div>
  );
}
