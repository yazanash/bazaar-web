import { GenderType, SellerType } from "./enums";

export interface ProfileData {
  name: string;
  phoneNumber: string;
  gender: GenderType;
  sellerType: SellerType;
  birthDate: Date | string;
}

export interface UserWalletResponse{
  adsLimit:number;
  featureLimits :number;
  expiryDate:string; 
}