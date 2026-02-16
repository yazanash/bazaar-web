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
      <ImageSlider images={data.gallery} />
      <BasicInfoCard data={data} />
      <SellerCard
        name={data.name}
        type={data.sellerType}
        phone={data.phoneNumber}
      />
      <GeneralDetailsCard
        description={data.description}
        color={data.color}
        fuelType={data.fuelType}
        isUsed={data.isUsed}
        installment={data.installment}
        usedKilometers={data.usedKilometers}
      />
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
