import { getPaymentGateways } from "@/lib/actions/admin";
import PaymentGatewaysList from "./PaymentGatewaysList";

export default async function PaymentGatewaysPage() {
  const response = await getPaymentGateways();
  return <PaymentGatewaysList gateways={response.data ?? []} />;
}
