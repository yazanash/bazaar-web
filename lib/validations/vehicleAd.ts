// lib/validations/vehicle.ts
import * as z from "zod";
import {
  Category,
  FuelType,
  Transmission,
  CarBodyType,
  RegistrationType,
  DriveSystem,
  UsageType,
  TrucksUsageType,
  TruckBodyType,
  MotorTransmission,
  MotorBodyType,
} from "@/types/enums";
const enumToZod = (e: any) => Object.values(e) as [string, ...string[]];
// lib/validations/vehicleAd.ts
// ... (الإستيرادات والدالة المساعدة كما هي)

export const vehicleFormSchema = z.object({
  cityId: z.coerce.number().min(1),
  vehicleModelId: z.coerce.number().min(1),
  manufactureYear: z.coerce.number().min(1900),
  price: z.coerce.number().min(1, "السعر مطلوب"),
  category: z.enum(enumToZod(Category)),
  fuelType: z.enum(enumToZod(FuelType)),
  isUsed: z.boolean().default(true),
  installment: z.boolean().default(false),
  usedKilometers: z.coerce.number().optional().default(0), // أضف default هنا
  color: z.string().min(1, "اللون مطلوب"),
  description: z.string().default(""),
  gallery: z
    .array(
      z.object({
        id: z.number().default(0),
        imagePath: z.string().min(1),
        order: z.number(),
      }),
    )
    .min(1, "يرجى إضافة صورة واحدة على الأقل"),

  carSpecs: z
    .object({
      transmission: z.enum(enumToZod(Transmission)).optional(),
      carBodyType: z.enum(enumToZod(CarBodyType)).optional(),
      registrationType: z.enum(enumToZod(RegistrationType)).optional(),
      driveSystem: z.enum(enumToZod(DriveSystem)).optional(),
      isModified: z.boolean().default(false).optional(),
      modificationDescription: z.string().default("").optional(),
      seatsCount: z.coerce.number().default(5).optional(),
      doorsCount: z.coerce.number().default(4).optional(),
      usageType: z.enum(enumToZod(UsageType)).optional(),
    })
    .optional(),

  motorSpecs: z
    .object({
      motorTransmission: z.enum(enumToZod(MotorTransmission)).optional(),
      isRegistered: z.boolean().default(false),
      motorBodyType: z.enum(enumToZod(MotorBodyType)).optional(),
      isModified: z.boolean().default(false),
      modificationDescription: z.string().default(""),
    })
    .optional(),

  truckSpecs: z
    .object({
      truckBodyType: z.enum(enumToZod(TruckBodyType)).optional(),
      trucksUsageType: z.enum(enumToZod(TrucksUsageType)).optional(),
      axisCount: z.coerce.number().default(2),
      backstorageLenght: z.coerce.number().default(0),
      backstorageHeight: z.coerce.number().default(0),
      isRegistered: z.boolean().default(false),
      payload: z.coerce.number().default(0),
    })
    .optional(),
});

export type VehicleFormValues = z.infer<typeof vehicleFormSchema>;
