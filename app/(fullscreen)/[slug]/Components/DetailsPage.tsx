"use client";
import { ImageSlider } from "./ImageSlider";
import { BasicInfoCard } from "./BasicInfoCard";
import { SellerCard } from "./SellerCard";
import { GeneralDetailsCard } from "./GeneralDetailsCard";
import { SpecsCard } from "./SpecsCard";
import { FloatingActions } from "./FloatingActions";

export default function VehicleDetailsPage({ data }: { data: any }) {
  return (
    <div className="bg-[#F0F2F5] min-h-screen pb-32 space-y-4" dir="rtl">
      {/* 1. قسم الصور */}
      <ImageSlider images={data.gallery} />

      {/* 2. بطاقة المعلومات الأساسية */}
      <BasicInfoCard data={data} />

      {/* 3. بطاقة صاحب الإعلان */}
      <SellerCard
        name={data.name}
        type={data.sellerType}
        phone={data.phoneNumber}
      />

      {/* 4. بطاقة التفاصيل العامة (الوصف واللون) */}
      <GeneralDetailsCard
        description={data.description}
        color={data.color}
        fuelType={data.fuelType}
        isUsed={data.isUsed}
        installment={data.installment}
        usedKilometers={data.usedKilometers}
      />

      {/* 5. بطاقة المواصفات المخصصة */}
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

      <FloatingActions phone={data.phoneNumber} />
    </div>
  );
}
