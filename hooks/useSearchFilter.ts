import { useSearchParams } from "next/navigation";
import {
  Category,
  Transmission,
  TruckBodyType,
  MotorTransmission,
  CarBodyType,
  DriveSystem,
  UsageType,
  TrucksUsageType,
  MotorBodyType,
  FuelType,
  PostDateFilter,
} from "@/types/enums";

export function useSearchFilters() {
  const searchParams = useSearchParams();

  const getGeneral = () => ({
    Category:
      (searchParams.get("Category") as unknown as Category) || undefined,
    Keyword: searchParams.get("Keyword") || "",
    CityId: searchParams.get("CityId")
      ? Number(searchParams.get("CityId"))
      : undefined,
    PriceFrom: searchParams.get("PriceFrom")
      ? Number(searchParams.get("PriceFrom"))
      : undefined,
    PriceTo: searchParams.get("PriceTo")
      ? Number(searchParams.get("PriceTo"))
      : undefined,
    IsUsed: searchParams.get("IsUsed") === "true",
    Installment: searchParams.get("Installment") === "true",
    VehicleModelId: searchParams.get("VehicleModelId")
      ? Number(searchParams.get("VehicleModelId"))
      : undefined,
    FuelType:
      (searchParams.get("FuelType") as unknown as FuelType) || undefined,
    PostDate:
      (searchParams.get("PostDate") as unknown as PostDateFilter) || undefined,
  });

  const getCarSpecs = () => ({
    Transmission:
      (searchParams.get("Transmission") as unknown as Transmission) ||
      undefined,
    CarBodyType:
      (searchParams.get("CarBodyType") as unknown as CarBodyType) || undefined,
    DriveSystem:
      (searchParams.get("DriveSystem") as unknown as DriveSystem) || undefined,
    UsageType:
      (searchParams.get("UsageType") as unknown as UsageType) || undefined,
    SeatsCount: searchParams.get("SeatsCount")
      ? Number(searchParams.get("SeatsCount"))
      : undefined,
    DoorsCount: searchParams.get("DoorsCount")
      ? Number(searchParams.get("DoorsCount"))
      : undefined,
    IsModified: searchParams.get("IsModified") === "true",
  });

  const getTruckSpecs = () => ({
    PayloadTo: searchParams.get("PayloadTo")
      ? Number(searchParams.get("PayloadTo"))
      : undefined,
    TruckBodyType:
      (searchParams.get("TruckBodyType") as unknown as TruckBodyType) ||
      undefined,
    TrucksUsageType:
      (searchParams.get("TrucksUsageType") as unknown as TrucksUsageType) ||
      undefined,
    PayloadFrom: searchParams.get("PayloadFrom")
      ? Number(searchParams.get("PayloadFrom"))
      : undefined,
  });

  const getMotorSpecs = () => ({
    MotorTransmission:
      (searchParams.get("MotorTransmission") as unknown as MotorTransmission) ||
      undefined,
    IsModified: searchParams.get("IsModified") === "true",
    MotorBodyType:
      (searchParams.get("MotorBodyType") as unknown as MotorBodyType) ||
      undefined,
  });

  return { getGeneral, getCarSpecs, getTruckSpecs, getMotorSpecs };
}
