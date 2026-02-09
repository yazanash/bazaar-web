"use client";

import React from "react";
import { ImageSlider } from "./ImageSlider";
import { BasicInfoCard } from "./BasicInfoCard";
import { SellerCard } from "./SellerCard";
import { GeneralDetailsCard } from "./GeneralDetailsCard";
import { SpecsCard } from "./SpecsCard";
import { FloatingActions } from "./FloatingActions";
import { VehicleAdDetailsResponse } from "@/types/ad";
import { Category } from "@/types/enums";
interface Props {
  adDetail: VehicleAdDetailsResponse;
}
export default function AdDetailsPage({ adDetail }: Props) {
  const data = adDetail;

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
      />

      <SpecsCard
        category={data.category}
        specs={
          data.category === Category.Passenger
            ? data.carSpecs
            : data.category === Category.Trucks
              ? data.truckSpecs
              : data.motorSpecs
        }
      />

      <FloatingActions phone={data.phoneNumber} />
    </div>
  );
}
