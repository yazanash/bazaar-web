"use client";

import React from "react";
import { ImageSlider } from "./Components/ImageSlider";
import { BasicInfoCard } from "./Components/BasicInfoCard";
import { SellerCard } from "./Components/SellerCard";
import { GeneralDetailsCard } from "./Components/GeneralDetailsCard";
import { SpecsCard } from "./Components/SpecsCard";
import { FloatingActions } from "./Components/FloatingActions";

// الداتا التجريبية للاختبار
const mockVehicleData = {
  id: 101,
  userId: "user_123",
  user: {
    name: "علاء سليمان",
  },
  sellerType: "مالك",
  phoneNumber: "+963 930 111 222",
  description:
    "السيارة بحالة ممتازة جداً، صيانة دورية بالوكالة، لا تحتاج لأي مصاريف. تواير جديدة وبطارية جديدة.",
  slug: "bmw-320i-2019-tartus-10774353",
  thumbnail:
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800",
  gallery: [
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800",
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800",
  ],
  city: { arabicName: "طرطوس" },
  manufacturer: { name: "BMW" },
  vehicleModel: { name: "320i" },
  category: "passenger",
  manufactureYear: 2019,
  isUsed: true,
  fuelType: "بنزين",
  price: 25500,
  usedKilometers: 45000,
  color: "أسود ملوكي",
  isFavorite: false,
  carSpecs: {
    transmission: "أوتوماتيك",
    registrationType: "خصوصي",
    carBodyType: "سيدان",
    driveSystem: "دفع خلفي RWD",
    isModified: true,
    modificationDescription: "إضافة شاشة أندرويد كبيرة مع نظام صوتي متطور",
    seatsCount: 5,
    doorsCount: 4,
    usageType: "استخدام شخصي",
  },
  truckSpecs: {},
  motorSpecs: {},
};

export default function AdDetailsPage() {
  // ملاحظة: لما نربط مع الـ API الحقيقي، رح نستخدم useParams لجلب الـ slug
  const data = mockVehicleData;

  return (
    <div className="bg-[#F0F2F5] min-h-screen pb-32 space-y-4" dir="rtl">
      {/* 1. قسم الصور (Slider) */}
      <ImageSlider images={data.gallery} />

      {/* 2. بطاقة المعلومات الأساسية (Price, Title, Location) */}
      <BasicInfoCard data={data} />

      {/* 3. بطاقة صاحب الإعلان (Seller Info) */}
      <SellerCard
        name={data.user?.name || "مُعلن"}
        type={data.sellerType}
        phone={data.phoneNumber}
      />

      {/* 4. بطاقة التفاصيل العامة (Description & General Specs) */}
      <GeneralDetailsCard
        description={data.description}
        color={data.color}
        fuelType={data.fuelType}
        isUsed={data.isUsed}
      />

      {/* 5. بطاقة المواصفات المخصصة (Dynamic Specs based on category) */}
      <SpecsCard
        category={data.category}
        specs={
          data.category === "passenger"
            ? data.carSpecs
            : data.category === "truck"
              ? data.truckSpecs
              : data.motorSpecs
        }
      />

      {/* 6. الأزرار العائمة للتواصل (Call & WhatsApp) */}
      <FloatingActions phone={data.phoneNumber} />
    </div>
  );
}
