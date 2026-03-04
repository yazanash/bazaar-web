"use client";
import { BasicInfoCard } from "@/components/AdDetailsComponents/BasicInfoCard";
import { GeneralDetailsCard } from "@/components/AdDetailsComponents/GeneralDetailsCard";
import { SellerCard } from "@/components/AdDetailsComponents/SellerCard";
import { SpecsCard } from "@/components/AdDetailsComponents/SpecsCard";
import { getImageUrl } from "@/lib/utils";
import { VehicleAdDetailsResponse, VehicleAdResponse } from "@/types/ad";
import { ArabicLabels } from "@/types/enums";
import {
  CarFront,
  MapPin,
  User as UserIcon,
  Phone,
  Calendar,
  Palette,
  Gauge,
  ShieldAlert,
  Fuel,
} from "lucide-react";

export default function AdminVehicleReview({
  data,
}: {
  data: VehicleAdDetailsResponse;
}) {
  return (
    <div
      className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm"
      dir="rtl"
    >
      {/* 1. الجاليري المصغر - عرض سريع للصور */}
      <div className="grid grid-cols-4 gap-2 p-4 bg-slate-50/50">
        {data.gallery?.map((img: string, idx: number) => (
          <div
            key={idx}
            className="aspect-video rounded-2xl overflow-hidden border border-white shadow-sm"
          >
            <img
              src={getImageUrl(img)}
              className="w-full h-full object-cover"
              alt="car"
            />
          </div>
        ))}
      </div>

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
                 : data.category === "trucks"
                   ? data.truckSpecs
                   : data.motorSpecs
             }
           />
    </div>
  );
}

function InfoBlock({ icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3 group">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">
          {label}
        </span>
        <span className="text-sm font-black text-slate-700">{value}</span>
      </div>
    </div>
  );
}
