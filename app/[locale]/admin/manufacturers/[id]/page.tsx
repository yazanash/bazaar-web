import { getManufacturer } from "@/lib/actions/admin";
import { id } from "zod/locales";
import ManufacturerModelsList from "./ModelsList";

export default async function ManufacturerModelsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getManufacturer(Number(id));

  return (
    <ManufacturerModelsList
      manufacturerId={response.data?.id ?? 0}
      models={response.data?.models ?? []}
      manufacturerName={response.data?.name ?? ""}
    />
  );
}
