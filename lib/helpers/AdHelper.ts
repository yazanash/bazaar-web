import {
  CarSpecsResponse,
  MotorSpecsResponse,
  TruckSpecsResponse,
  VehicleAdRequest,
} from "@/types/ad";
import z from "zod";
import { vehicleFormSchema } from "../validations/vehicleAd";
import {
  CarBodyType,
  Category,
  DriveSystem,
  FuelType,
  MotorBodyType,
  MotorTransmission,
  RegistrationType,
  Transmission,
  TruckBodyType,
  TrucksUsageType,
  UsageType,
} from "@/types/enums";
import { CarSpecs } from "@/types/filters";
type VehicleFormValues = z.infer<typeof vehicleFormSchema>;
export const mapToVehicleRequest = (
  data: VehicleFormValues,
): VehicleAdRequest => {
  return {
    ...data,
    cityId: Number(data.cityId),
    vehicleModelId: Number(data.vehicleModelId),
    price: Number(data.price),
    manufactureYear: Number(data.manufactureYear),
    usedKilometers: Number(data.usedKilometers),
    isUsed: data.isUsed,
    fuelType: data.fuelType as FuelType,
    installment: data.installment,
    category: data.category as Category,
    color: data.color,
    description: data.description,

    carSpecs:
      data.category === Category.Passenger
        ? ({
            transmission: data.carSpecs?.transmission as Transmission,
            carBodyType: data.carSpecs?.carBodyType as CarBodyType,
            registrationType: data.carSpecs
              ?.registrationType as RegistrationType,
            driveSystem: data.carSpecs?.driveSystem as DriveSystem,
            isModified: data.carSpecs?.isModified || false,
            modificationDescription:
              data.carSpecs?.modificationDescription || "",
            seatsCount: Number(data.carSpecs?.seatsCount),
            doorsCount: Number(data.carSpecs?.doorsCount),
            usageType: data.carSpecs?.usageType as UsageType,
          } as CarSpecsResponse)
        : undefined,
    truckSpecs:
      data.category === Category.Trucks
        ? ({
            truckBodyType: data.truckSpecs?.truckBodyType as TruckBodyType,
            trucksUsageType: data.truckSpecs
              ?.trucksUsageType as TrucksUsageType,
            axisCount: Number(data.truckSpecs?.axisCount),
            backstorageLength: Number(data.truckSpecs?.backstorageLength),
            backstorageHeight: Number(data.truckSpecs?.backstorageHeight),
            isRegistered: data.truckSpecs?.isRegistered,
            payload: data.truckSpecs?.payload,
          } as TruckSpecsResponse)
        : undefined,
    motorSpecs:
      data.category === Category.Motorcycles
        ? ({
            motorTransmission: data.motorSpecs
              ?.motorTransmission as MotorTransmission,
            isRegistered: data.motorSpecs?.isRegistered,
            motorBodyType: data.motorSpecs?.motorBodyType as MotorBodyType,
            isModified: data.motorSpecs?.isModified,
            modificationDescription: data.motorSpecs?.modificationDescription,
          } as MotorSpecsResponse)
        : undefined,

    gallery: data.gallery,
  };
};

export const mapResponseToForm = (data: VehicleAdRequest): any => {
  return {
    ...data,
    cityId: Number(data.cityId),
    vehicleModelId: Number(data.vehicleModelId),
    price: Number(data.price),
    manufactureYear: Number(data.manufactureYear),
    usedKilometers: Number(data.usedKilometers),
    isUsed: data.isUsed,
    fuelType: data.fuelType as FuelType,
    installment: data.installment,
    category: data.category as Category,
    color: data.color,
    description: data.description,

    carSpecs:
      data.category === Category.Passenger
        ? ({
            transmission: data.carSpecs?.transmission as Transmission,
            carBodyType: data.carSpecs?.carBodyType as CarBodyType,
            registrationType: data.carSpecs
              ?.registrationType as RegistrationType,
            driveSystem: data.carSpecs?.driveSystem as DriveSystem,
            isModified: data.carSpecs?.isModified || false,
            modificationDescription:
              data.carSpecs?.modificationDescription || "",
            seatsCount: Number(data.carSpecs?.seatsCount),
            doorsCount: Number(data.carSpecs?.doorsCount),
            usageType: data.carSpecs?.usageType as UsageType,
          } as CarSpecsResponse)
        : undefined,
    truckSpecs:
      data.category === Category.Trucks
        ? ({
            truckBodyType: data.truckSpecs?.truckBodyType as TruckBodyType,
            trucksUsageType: data.truckSpecs
              ?.trucksUsageType as TrucksUsageType,
            axisCount: Number(data.truckSpecs?.axisCount),
            backstorageLength: Number(data.truckSpecs?.backstorageLength),
            backstorageHeight: Number(data.truckSpecs?.backstorageHeight),
            isRegistered: data.truckSpecs?.isRegistered,
            payload: data.truckSpecs?.payload,
          } as TruckSpecsResponse)
        : undefined,
    motorSpecs:
      data.category === Category.Motorcycles
        ? ({
            motorTransmission: data.motorSpecs
              ?.motorTransmission as MotorTransmission,
            isRegistered: data.motorSpecs?.isRegistered,
            motorBodyType: data.motorSpecs?.motorBodyType as MotorBodyType,
            isModified: data.motorSpecs?.isModified,
            modificationDescription: data.motorSpecs?.modificationDescription,
          } as MotorSpecsResponse)
        : undefined,

    gallery: data.gallery,
  };
};
