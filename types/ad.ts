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
  transmission: Transmission;
  registrationType: RegistrationType;
  carBodyType: CarBodyType;
  driveSystem: DriveSystem;
  isModified: boolean;
  modificationDescription: string;
  seatsCount: number;
  doorsCount: number;
  usageType: UsageType;
}
export interface TruckSpecsResponse {
  axisCount: number;
  backstorageLenght: number;
  backstorageHeight: number;
  truckBodyType: TruckBodyType;
  trucksUsageType: TrucksUsageType;
  isRegistered: boolean;
  payload: number;
}
export interface MotorSpecsResponse {
  motorTransmission: MotorTransmission;
  isRegistered: boolean;
  motorBodyType: MotorBodyType;
  isModified: boolean;
  modificationDescription: string;
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
export interface Masters {
  cities: CityResponse[];
  models: ManufacturerModelResponse[];
}
export interface ImageRequest {
  id?: Number;
  imagePath: string;
  order: Number;
}

export interface VehicleAdRequest {
  id?:number;
  cityId: number;
  vehicleModelId: number;
  manufactureYear: number;
  isUsed: boolean;
  fuelType: FuelType;
  installment: boolean;
  price: number;
  category: Category;
  usedKilometers: number;
  color: string;
  description: string;

  carSpecs?: CarSpecsResponse;
  truckSpecs?: TruckSpecsResponse;
  motorSpecs?: MotorSpecsResponse;
  gallery: ImageRequest[];
}

export interface UserAdsResponse {
  pubStatus: PubStatus;
  reasone: string;
  vehicleAdResponse: VehicleAdResponse;
}
