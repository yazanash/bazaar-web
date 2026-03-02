import AdsList from "@/components/AdminComponents/AdsList";
import { getPendingAds } from "@/lib/actions/admin";

export default async function AdsListPage() {
  const response = await getPendingAds();
  if(!response.data?.items){
    return <h1>no data</h1>
  }
  return <AdsList ads={response.data?.items} />;
}
