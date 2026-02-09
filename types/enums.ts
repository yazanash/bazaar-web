// --- 1. Enums التعريفات البرمجية ---

export enum PostDateFilter { 
  AnyTime="AnyTime",
   Past24="Past24", PastWeek="PastWeek", PastMonth="PastMonth" }
export enum GenderType { NotSpecified="NotSpecified", Male="Male", Female="Female" }
export enum CarBodyType { NotSpecified="NotSpecified", Sedan="Sedan", Hatchback="Hatchback", Station="Station",
   Coupe="Coupe", Convertible="Convertible", SUV="SUV", OffRoad="OffRoad" }
export enum MotorBodyType { NotSpecified="NotSpecified", Chrome="Chrome", CarbonFiber="CarbonFiber", Steel="Steel", Aluminum ="Aluminum"}
export enum FuelType { NotSpecified="NotSpecified", Diesel="Diesel", Gasoline="Gasoline", Electric="Electric", Hybrid="Hybrid" }
export enum SellerType { NotSpecified="NotSpecified", Owner="Owner", Broker="Broker", Agency ="Agency"}
export enum Category 
{ NotSpecified="NotSpecified", 
  Passenger="Passenger", 
  Motorcycles="Motorcycles", 
  Trucks ="Trucks"}
export enum Transmission { NotSpecified="NotSpecified", Manual="Manual", Automatic="Automatic", CVT="CVT", DualClutch ="DualClutch"}
export enum MotorTransmission { NotSpecified="NotSpecified", Manual="Manual", Automatic="Automatic", SemiAutomatic="SemiAutomatic" }
export enum RegistrationType { NotSpecified="NotSpecified", PublicReg="PublicReg", PrivateReg="PrivateReg" }
export enum DriveSystem { NotSpecified="NotSpecified", FWD="FWD", RWD="RWD", AWD="AWD", FourWD="FourWD" }
export enum UsageType { NotSpecified="NotSpecified", InternalUsage="InternalUsage", ExternalUsage="ExternalUsage", Personal="Personal" }
export enum TrucksUsageType { NotSpecified="NotSpecified", Personal="Personal", HeavyTransport="HeavyTransport", WaterTanker="WaterTanker", Refrigerated="Refrigerated", FurnitureMoving="FurnitureMoving", Construction="Construction" }
export enum PubStatus { NotSpecified="NotSpecified", Accepted="Accepted", Rejected="Rejected", Pending="Pending", Closed="Closed" }
export enum TruckBodyType { NotSpecified="NotSpecified", Refrigerated="Refrigerated", Closed="Closed", Open="Open", Tanker="Tanker", Chassis="Chassis", Tipper="Tipper", Pickup ="Pickup"}


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
};