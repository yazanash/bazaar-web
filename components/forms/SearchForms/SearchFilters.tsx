"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, RotateCcw, Check } from "lucide-react";
import { Category } from "@/types/enums";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
  DrawerHeader,
} from "@/components/ui/drawer";

import { GeneralSection } from "./GeneralSection";
import { CarSpecsSection } from "./CarSpecsSection";
import { MotorSpecsSection } from "./MotorSpecsSection";
import { TruckSpecsSection } from "./TruckSpecsSection";
import {
  GeneralFilter,
  CarSpecs,
  TruckSpecs,
  MotorSpecs,
} from "@/types/filters";
import { useSearchFilters } from "@/hooks/useSearchFilter";
import {
  CityResponse,
  ManufacturerModelResponse,
  ManufacturerResponse,
} from "@/types/ad";
import { getMasters } from "@/lib/actions/masterData";
export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getGeneral, getCarSpecs, getTruckSpecs, getMotorSpecs } =
    useSearchFilters();
  const [open, setOpen] = useState(false);

  const [general, setGeneral] = useState<GeneralFilter>({});
  const [carSpecs, setCarSpecs] = useState<CarSpecs>({});
  const [truckSpecs, setTruckSpecs] = useState<TruckSpecs>({});
  const [motorSpecs, setMotorSpecs] = useState<MotorSpecs>({});
  const [cities, setCities] = useState<CityResponse[]>([]);
  const [models, setModels] = useState<ManufacturerModelResponse[]>([]);
  const [manufacturers, setManufacturers] = useState<ManufacturerResponse[]>(
    [],
  );
  const [isLoadingMaster, setIsLoadingMaster] = useState(false);

  const fetchMasterData = async () => {
    setIsLoadingMaster(true);
    try {
      // افترضنا أن الـ API يرجع كائن يحتوي على المصفوفات
      const response = await getMasters();
      setCities(response.data?.cities ?? []);
      setModels(response.data?.models ?? []);
      setManufacturers(response.data?.manufacturer ?? []);
    } catch (error) {
      console.error("Error fetching master data", error);
    } finally {
      setIsLoadingMaster(false);
    }
  };
  useEffect(() => {
    if (open) {
      setGeneral(getGeneral());
      setCarSpecs(getCarSpecs());
      setTruckSpecs(getTruckSpecs());
      setMotorSpecs(getMotorSpecs());
      fetchMasterData();
    }
  }, [open, searchParams]);

  const handleApply = () => {
    let finalModel: any = { ...general };

    if (general.Category === Category.Passenger) {
      finalModel = { ...finalModel, ...carSpecs };
    } else if (general.Category === Category.Trucks) {
      finalModel = { ...finalModel, ...truckSpecs };
    } else if (general.Category === Category.Motorcycles) {
      finalModel = { ...finalModel, ...motorSpecs };
    }

    const params = new URLSearchParams();
    Object.entries(finalModel).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== false
      ) {
        params.set(key, value.toString());
      }
    });

    setOpen(false);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="h-11 w-11 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
          <Filter size={20} />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-screen w-full max-w-md bg-white z-120 flex flex-col rounded-l-[2rem]">
        <DrawerHeader className="p-6 border-b flex items-center justify-between">
          <div className="text-right">
            <DrawerTitle className="text-xl font-black">
              تصفية النتائج
            </DrawerTitle>
            <DrawerDescription>خصص بحثك بدقة</DrawerDescription>
          </div>
          <Search size={24} className="text-blue-600" />
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
          <GeneralSection
            cities={cities}
            models={models}
            states={general}
            manufacturers={manufacturers}
            setStates={(val) => setGeneral((prev) => ({ ...prev, ...val }))}
          />

          {general.Category && (
            <section className="p-4 bg-slate-50 rounded-[2rem] border border-slate-200 mt-6">
              {general.Category === Category.Passenger && (
                <CarSpecsSection
                  states={carSpecs}
                  setStates={(val) =>
                    setCarSpecs((prev) => ({ ...prev, ...val }))
                  }
                />
              )}
              {general.Category === Category.Trucks && (
                <TruckSpecsSection
                  states={truckSpecs}
                  setStates={(val) =>
                    setTruckSpecs((prev) => ({ ...prev, ...val }))
                  }
                />
              )}
              {general.Category === Category.Motorcycles && (
                <MotorSpecsSection
                  states={motorSpecs}
                  setStates={(val) =>
                    setMotorSpecs((prev) => ({ ...prev, ...val }))
                  }
                />
              )}
            </section>
          )}
        </div>

        <div className="p-6 border-t bg-white grid grid-cols-2 gap-4">
          <button
            onClick={handleApply}
            className="h-14 bg-blue-600 text-white rounded-2xl font-black flex items-center justify-center gap-2"
          >
            <Check size={20} /> تطبيق
          </button>
          <button
            onClick={() => {
              setOpen(false);
              router.push("/search");
            }}
            className="h-14 bg-slate-100 text-slate-600 rounded-2xl font-black flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} /> إعادة ضبط
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
