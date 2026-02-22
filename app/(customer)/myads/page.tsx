import { UserAdCard } from "@/components/UserAdsComponents/UserAdCard";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getUserAds } from "@/lib/actions/ads";
import { UnauthorizedBlock } from "@/components/UnauthorizedBlock";
import { UserAdsResponse } from "@/types/ad";
import WalletCard from "@/components/UserWallet";
import { getUserWallet } from "@/lib/actions/userWallet";
export default async function MyAdsPage() {
  const walletResult = await getUserWallet();
  const wallet = walletResult.data;
  const response = await getUserAds();
  if (response.status == 401) {
    return <UnauthorizedBlock />;
  }
  const ads = response.data;
  if (!ads)
    return (
      <h1>
        <data value=""></data>
      </h1>
    );
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 pb-24 relative" dir="rtl">
      <div className="flex flex-row items-center justify-between mb-3">
        <h2 className="text-xl font-black text-blue-900 text-center">
          إعلاناتي
        </h2>
        <Link
          href="/new-ad"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-2 px-3 rounded-2xl  ms-1 transition-all  group"
        >
          <span className="font-bold">أضف إعلانك</span>
          <div className="bg-white/20 p-1 rounded-full group-hover:rotate-90 transition-transform">
            <Plus size={22} strokeWidth={3} />
          </div>
        </Link>
      </div>
      {wallet && <WalletCard UserWallet={wallet} />}
      <div className="max-w-2xl mt-2 mx-auto space-y-4">
        {ads.items.map((item: UserAdsResponse) => (
          <UserAdCard key={item.vehicleAdResponse.id} ad={item} />
        ))}

        {ads.items.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-bold">
            لا يوجد لديك إعلانات حالياً
          </div>
        )}
      </div>
    </div>
  );
}
