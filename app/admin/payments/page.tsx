import { getPaymentRequests } from "@/lib/actions/admin";
import PaymentRequestsList from "./PaymentRequestList";

export default async function PaymentRequestsPage() {
  const response = await getPaymentRequests();

  return <PaymentRequestsList initialRequests={response.data ?? []} />;
}
