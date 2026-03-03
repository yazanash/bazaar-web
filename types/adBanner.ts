export interface AdBannerResponse {
  id: number;
  imageUrl: string;
  link: string;
}

export interface AdBannerRequest {
  image: File | null;
  link: string;
  activationDate: string;
  durationDays: number;
}

export interface AdBannerAdminResponse {
  id: number;
  imageUrl: string;
  link: string;
  activationDate: string;
  expirationDate: string;
}
