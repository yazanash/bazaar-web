"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleFormSchema } from "@/lib/validations/vehicleAd";
import { Form } from "@/components/ui/form";
import { Category } from "@/types/enums";
import * as z from "zod";
type VehicleFormValues = z.infer<typeof vehicleFormSchema>;
import { GeneralSection } from "./GeneralForm";
import { CarSpecsSection } from "./CarSpecsForm";
import { MotorSpecsSection } from "./MotorSpecsForm";
import { TruckSpecsSection } from "./TruckSpecsForm";
import { ImageUploadSection } from "./ImageUploadForm";
import {
  CityResponse,
  ManufacturerModelResponse,
  ManufacturerResponse,
  VehicleAdRequest,
} from "@/types/ad";
import { createAd, deleteAdById, updateAd } from "@/lib/actions/ads";
import { mapResponseToForm, mapToVehicleRequest } from "@/lib/helpers/AdHelper";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function AddAdForm({
  cities,
  models,
  manufacturer,
  initialData,
}: {
  cities: CityResponse[];
  models: ManufacturerModelResponse[];
  manufacturer: ManufacturerResponse[];
  initialData?: VehicleAdRequest;
}) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema) as any,
    defaultValues: {
      category: Category.Passenger,
      isUsed: true,
      installment: false,
      manufactureYear: new Date().getFullYear(),
      price: 0,
      usedKilometers: 0,
      cityId: undefined as any,
      vehicleModelId: undefined as any,
      color: "",
      description: "",
      gallery: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      const formData = mapResponseToForm(initialData);
      form.reset(formData);
      console.log("Form has been reset with:", formData);
    }
    setIsReady(true);
  }, [initialData, form]);

  const onSubmit = async (data: VehicleFormValues) => {
    try {
      const vehicleData = mapToVehicleRequest(data);

      let result;

      if (initialData?.id) {
        result = await updateAd(initialData.id, vehicleData);
        router.push(`/myads`);
      } else {
        result = await createAd(vehicleData);
        router.push(`/myads`);
      }

      if (result.success) {
        alert(initialData ? "تم التعديل بنجاح!" : "تم النشر بنجاح!");
      } else {
        alert("فشلت العملية، تحقق من البيانات");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("حدث خطأ غير متوقع أثناء الحفظ");
    }
  };
  const handleDelete = async () => {
    if (confirm("هل أنت متأكد من حذف هذا الإعلان نهائياً؟")) {
      try {
        if (initialData?.id) {
          const result = await deleteAdById(initialData?.id);
          if (result.success) router.push("/myads");
        }
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };
  const selectedCategory = form.watch("category");
  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-slate-500 font-bold">جاري تحميل بيانات الإعلان...</p>
      </div>
    );
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 max-w-4xl mx-auto p-6 bg-white rounded-[2.5rem] shadow-xl border border-slate-100"
      >
        <ImageUploadSection form={form} />

        <GeneralSection
          manufacturers={manufacturer}
          form={form}
          cities={cities}
          models={models}
        />

        <hr className="border-slate-100" />

        <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
          {selectedCategory === Category.Passenger && (
            <CarSpecsSection form={form} />
          )}
          {selectedCategory === Category.Motorcycles && (
            <MotorSpecsSection form={form} />
          )}
          {selectedCategory === Category.Trucks && (
            <TruckSpecsSection form={form} />
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xl font-black rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
        >
          نشر الإعلان
        </button>
        {initialData?.id && (
          <button
            type="button"
            onClick={handleDelete}
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-xl font-black rounded-2xl shadow-lg shadow-red-200 transition-all active:scale-[0.98]"
          >
            حذف الإعلان
          </button>
        )}
      </form>
    </Form>
  );
}
