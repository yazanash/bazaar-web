import { CarBodyType, Category, DriveSystem, FuelType, MotorBodyType, MotorTransmission, PostDateFilter, Transmission, TruckBodyType, TrucksUsageType, UsageType } from "./enums";

export interface GeneralFilter {
  Keyword?: string; 
  CityId?: number;
  VehicleModelId ?: number;
  Category?: Category;
  PriceFrom?: number;
  PriceTo?: number;
  IsUsed?: boolean;
  Installment?: boolean;
  FuelType?: FuelType;
  PostDate?: PostDateFilter;

}

export interface CarSpecs {
  Transmission?: Transmission;
  CarBodyType?: CarBodyType;
  DriveSystem?: DriveSystem;
  UsageType?: UsageType;
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