// --- 1. Enums التعريفات البرمجية ---

export enum PostDateFilter { 
  AnyTime="anyTime",
   Past24="past24", PastWeek="pastWeek", PastMonth="pastMonth" }
export enum GenderType { NotSpecified="notSpecified", Male="male", Female="female" }
export enum CarBodyType { NotSpecified="notSpecified", Sedan="sedan", Hatchback="hatchback", Station="station",
   Coupe="coupe", Convertible="convertible", SUV="suv", OffRoad="offRoad" }
export enum MotorBodyType { NotSpecified="notSpecified", Chrome="chrome", CarbonFiber="carbonFiber", Steel="steel", Aluminum ="aluminum"}
export enum FuelType { NotSpecified="notSpecified", Diesel="diesel", Gasoline="gasoline", Electric="electric", Hybrid="hybrid" }
export enum SellerType { NotSpecified="notSpecified", Owner="owner", Broker="broker", Agency ="agency"}
export enum Category 
{ NotSpecified="notSpecified", 
  Passenger="passenger", 
  Motorcycles="motorcycles", 
  Trucks ="trucks"}
export enum Transmission { NotSpecified="notSpecified", Manual="manual", Automatic="automatic", CVT="cvt", DualClutch ="dualClutch"}
export enum MotorTransmission { NotSpecified="notSpecified", Manual="manual", Automatic="automatic", SemiAutomatic="semiAutomatic" }
export enum RegistrationType { NotSpecified="notSpecified", PublicReg="publicReg", PrivateReg="privateReg" }
export enum DriveSystem { NotSpecified="notSpecified", FWD="fwd", RWD="rwd", AWD="awd", FourWD="fourWD" }
export enum UsageType { NotSpecified="notSpecified", InternalUsage="internalUsage", ExternalUsage="externalUsage", Personal="personal" }
export enum TrucksUsageType { NotSpecified="notSpecified", Personal="personal", HeavyTransport="heavyTransport", WaterTanker="waterTanker", Refrigerated="refrigerated", FurnitureMoving="furnitureMoving", Construction="construction" }
export enum PubStatus { NotSpecified="notSpecified", Accepted="accepted", Rejected="rejected", Pending="pending", Closed="closed" }
export enum TruckBodyType { NotSpecified="notSpecified", Refrigerated="refrigerated", Closed="closed", Open="open", Tanker="tanker", Chassis="chassis", Tipper="tipper", Pickup ="pickup"}


export const ArabicLabels: Record<string, Record<string, string>> = {
  PostDateFilter: {
    [PostDateFilter.AnyTime]: "أي وقت",
    [PostDateFilter.Past24]: "آخر 24 ساعة",
    [PostDateFilter.PastWeek]: "آخر أسبوع",
    [PostDateFilter.PastMonth]: "آخر شهر",
  },
  GenderType: {
    [GenderType.NotSpecified]: "غير محدد",
    [GenderType.Male]: "ذكر",
    [GenderType.Female]: "أنثى",
  },
  CarBodyType: {
    [CarBodyType.NotSpecified]: "غير محدد",
    [CarBodyType.Sedan]: "سيدان",
    [CarBodyType.Hatchback]: "هاتشباك",
    [CarBodyType.Station]: "ستيشن",
    [CarBodyType.Coupe]: "كوبيه",
    [CarBodyType.Convertible]: "كابورليه",
    [CarBodyType.SUV]: "دفع رباعي / SUV",
    [CarBodyType.OffRoad]: "أوف رود",
  },
  FuelType: {
    [FuelType.NotSpecified]: "غير محدد",
    [FuelType.Diesel]: "ديزل",
    [FuelType.Gasoline]: "بنزين",
    [FuelType.Electric]: "كهرباء",
    [FuelType.Hybrid]: "هجين",
  },
  SellerType: {
    [SellerType.NotSpecified]: "غير محدد",
    [SellerType.Owner]: "مالك",
    [SellerType.Broker]: "وسيط",
    [SellerType.Agency]: "معرض / وكالة",
  },
  Category: {
    [Category.NotSpecified]: "غير محدد",
    [Category.Passenger]: "سيارات ركاب",
    [Category.Motorcycles]: "دراجات نارية",
    [Category.Trucks]: "شاحنات",
  },
  Transmission: {
    [Transmission.NotSpecified]: "غير محدد",
    [Transmission.Manual]: "عادي (Manual)",
    [Transmission.Automatic]: "أوتوماتيك",
    [Transmission.CVT]: "CVT",
    [Transmission.DualClutch]: "دبل كلاتش",
  },
  DriveSystem: {
    [DriveSystem.NotSpecified]: "غير محدد",
    [DriveSystem.FWD]: "دفع أمامي",
    [DriveSystem.RWD]: "دفع خلفي",
    [DriveSystem.AWD]: "دفع كلي مستمر",
    [DriveSystem.FourWD]: "دفع رباعي 4x4",
  },
  PubStatus: {
    [PubStatus.NotSpecified]: "غير محدد",
    [PubStatus.Accepted]: "تم القبول",
    [PubStatus.Rejected]: "مرفوض",
    [PubStatus.Pending]: "قيد المراجعة",
    [PubStatus.Closed]: "مغلق",
  },
  TruckBodyType: {
    [TruckBodyType.NotSpecified]: "غير محدد",
    [TruckBodyType.Refrigerated]: "براد",
    [TruckBodyType.Closed]: "مغلق",
    [TruckBodyType.Open]: "مفتوح",
    [TruckBodyType.Tanker]: "صهريج",
    [TruckBodyType.Chassis]: "شاسيه",
    [TruckBodyType.Tipper]: "قلاب",
    [TruckBodyType.Pickup]: "بيك أب",
  },
   TrucksUsageType: {
    [TrucksUsageType.NotSpecified]: "غير محدد",
    [TrucksUsageType.Construction]: "اعمال بناء",
    [TrucksUsageType.FurnitureMoving]: "نقل مفروشات",
    [TrucksUsageType.HeavyTransport]: "نقل ثقيل",
    [TrucksUsageType.Personal]: "شخصي",
    [TrucksUsageType.Refrigerated]: "براد / مبرد",
    [TrucksUsageType.WaterTanker]: "صهريج مي"
  },
  MotorTransmission: {
    [MotorTransmission.NotSpecified]: "غير محدد",
    [MotorTransmission.Manual]: "عادي (Manual)",
    [MotorTransmission.Automatic]: "أوتوماتيك",
    [MotorTransmission.SemiAutomatic]: "نصف اوتوماتيك",
  },
  UsageType: {
    [UsageType.NotSpecified]: "غير محدد",
    [UsageType.ExternalUsage]: "نقل خارجي", 
    [UsageType.InternalUsage]: "نقل داخلي",
    [UsageType.Personal]: "شخصي",
  },
  MotorBodyType: {
    [MotorBodyType.Aluminum]: "المينيوم",
    [MotorBodyType.CarbonFiber]: "كربون فايبر", 
    [MotorBodyType.Chrome]: "كروم",
    [MotorBodyType.Steel]: "ستيل",
    [MotorBodyType.NotSpecified]: "غير محدد",
  },
  RegistrationType: {
    [RegistrationType.PrivateReg]: "خصوصي",
    [RegistrationType.PublicReg]: "عمومي", 
    [RegistrationType.NotSpecified]: "غير محدد",
  },
};