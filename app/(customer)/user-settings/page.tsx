
import { logoutAction } from "@/lib/actions/auth";
import { User, ShieldCheck, LogOut, ChevronLeft } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getProfileAction } from "@/lib/actions/profile";
import { UnauthorizedBlock } from "@/components/UnauthorizedBlock";
import WalletCard from "@/components/UserWallet";
import { getUserWallet } from "@/lib/actions/userWallet";
import UserSettingsComp from "@/components/UserSettingsComp";
export default async function SettingsPage() {
  const result = await getProfileAction();
  const walletResult = await getUserWallet();
  const wallet = walletResult.data;
  if (result.status == 401) {
    return <UnauthorizedBlock />;
  }
  if (result.status == 404) {
    redirect("/profile");
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4" dir="rtl">
      <h1 className="text-xl font-black text-blue-900 mb-6 mr-2">الإعدادات</h1>
      {wallet && <WalletCard UserWallet={wallet} />}
      <UserSettingsComp />
    </div>
  );
}
