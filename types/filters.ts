import { CarBodyType, Category, DriveSystem, FuelType, MotorBodyType, MotorTransmission, PostDateFilter, Transmission, TruckBodyType, TrucksUsageType, UsageType } from "./enums";

export interface GeneralFilter {
  Keyword?: string; // Done
  CityId?: number;// Done
  VehicleModelId ?: number;// Done
  Category?: Category;// Done
  PriceFrom?: number;// Done
  PriceTo?: number;// Done
  IsUsed?: boolean;// Done
  Installment?: boolean;// Done
  FuelType?: FuelType;// Done
  PostDate?: PostDateFilter;// Done

}

export interface CarSpecs {
  Transmission?: Transmission;// Done
  CarBodyType?: CarBodyType;// Done
  DriveSystem?: DriveSystem;// Done
  UsageType?: UsageType;// Done
  SeatsCount?: number;
  DoorsCount?: number;
  IsModified?:boolean
}

export interface TruckSpecs {
  TruckBodyType?: TruckBodyType;
  TrucksUsageType ?: TrucksUsageType;
  PayloadFrom?: number;
  PayloadTo?: number;
}

export interface MotorSpecs {
  MotorTransmission?: MotorTransmission;
  MotorBodyType? : MotorBodyType;
  IsModified?: boolean;
}