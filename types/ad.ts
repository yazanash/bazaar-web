import {
  FuelType,
  Category,
  PubStatus,
  SellerType,
  Transmission,
  RegistrationType,
  CarBodyType,
  DriveSystem,
  UsageType,
  MotorTransmission,
  MotorBodyType,
  TruckBodyType,
  TrucksUsageType,
} from "@/types/enums";
import { CarSpecs } from "./filters";

// واجهة المدينة
export interface CityResponse {
  id: number;
  arabicName: string;
  englishName: string;
}

export interface ManufacturerModelResponse {
  id: number;
  name: string;
  category: string;
}

export interface VehicleAdResponse {
  id: number;
  isFavorite: boolean;
  city: CityResponse;
  vehicleModel: ManufacturerModelResponse;
  manufactureYear: number;
  thumbnail: string;
  fuelType: FuelType;
  installment: boolean;
  price: number;
  category: Category;
  slug: string;
  viewsCount: number;
  favoritesCount: number;
}

export interface UserAdItem {
  pubStatus: PubStatus;
  reasone: string;
  vehicleAdResponse: VehicleAdResponse;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  totalPages: number;
  pageSize: number;
}
export interface CarSpecsResponse {
  Transmission: Transmission;
  RegistrationType: RegistrationType;
  CarBodyType: CarBodyType;
  DriveSystem: DriveSystem;
  IsModified: boolean;
  ModificationDescription: string;
  SeatsCount: number;
  DoorsCount: number;
  UsageType: UsageType;
}
export interface TruckSpecsResponse {
  AxisCount: number;
  BackstorageLenght: number;
  BackstorageHeight: number;
  TruckBodyType: TruckBodyType;
  TrucksUsageType: TrucksUsageType;
  IsRegistered: boolean;
  Payload: number;
}
export interface MotorSpecsResponse {
  MotorTransmission: MotorTransmission;
  IsRegistered: boolean;
  MotorBodyType: MotorBodyType;
  IsModified: boolean;
  ModificationDescription: string;
}

export interface VehicleAdDetailsResponse {
  isFavorite: boolean;
  id: number;
  city: CityResponse;
  vehicleModel: ManufacturerModelResponse;
  manufactureYear: number;
  thumbnail: string;
  isUsed: boolean;
  fuelType: FuelType;
  installment: boolean;
  price: number;
  category: Category;
  usedKilometers: number;
  color: string;
  description: string;
  sellerType: SellerType;
  name: string;
  phoneNumber: string;
  slug: string;
  carSpecs?: CarSpecsResponse;
  truckSpecs?: TruckSpecsResponse;
  motorSpecs?: MotorSpecsResponse;
  gallery: string[];
  viewsCount: number;
  favoritesCount: number;
}
