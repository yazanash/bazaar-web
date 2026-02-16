"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CityResponse, ManufacturerModelResponse } from "@/types/ad";
import { Category, FuelType, ArabicLabels } from "@/types/enums";
import { UseFormReturn } from "react-hook-form";

interface GeneralSectionProps {
  form: UseFormReturn<any>;
  cities: CityResponse[];
  models: ManufacturerModelResponse[];
}

export function GeneralSection({ form, cities, models }: GeneralSectionProps) {

  const selectedCategory = form.watch("category");
  const isUsed = form.watch("IsUsed");

  const filteredModels = models?.filter(
    (mod) => mod.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black text-slate-800 border-r-4 border-blue-600 pr-3">
        المعلومات الأساسية
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">نوع المركبة</FormLabel>
              <Select 
                onValueChange={(val) => {
                  field.onChange(val);
                  form.setValue("vehicleModelId", "");
                }} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200">
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Category).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {ArabicLabels.Category[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vehicleModelId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">الماركة والموديل</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value?.toString()}
                disabled={!selectedCategory}
              >
                <FormControl>
                  <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200">
                    <SelectValue placeholder={selectedCategory ? "اختر الموديل..." : "اختر نوع المركبة أولاً"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-75">
                  {filteredModels?.map((mod) => (
                    <SelectItem key={mod.id} value={mod.id.toString()}>
                      {mod.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">السعر ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  className="h-12 rounded-xl border-slate-200"
                  placeholder="0.00"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cityId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">المدينة</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger className="h-12 rounded-xl border-slate-200">
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cities?.map((city) => (
                    <SelectItem key={city.id} value={city.id.toString()}>
                      {city.arabicName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="manufactureYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">سنة الصنع</FormLabel>
              <FormControl>
                <Input 
                   type="number" 
                   {...field} 
                   className="h-12 rounded-xl border-slate-200"
                   min={1950}
                   max={new Date().getFullYear() + 1}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fuelType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">نوع الوقود</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 rounded-xl border-slate-200">
                    <SelectValue placeholder="اختر الوقود" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(FuelType).map((f) => (
                    <SelectItem key={f} value={f}>
                      {ArabicLabels.FuelType[f]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">اللون</FormLabel>
              <FormControl>
                <Input {...field} className="h-12 rounded-xl border-slate-200" placeholder="مثال: أسود ملوكي" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isUsed && (
          <FormField
            control={form.control}
            name="usedKilometers"
            render={({ field }) => (
              <FormItem className="animate-in fade-in slide-in-from-top-2 duration-300">
                <FormLabel className="font-bold">الكيلوميترات المقطوعة</FormLabel>
                <FormControl>
                  <Input type="number" {...field} className="h-12 rounded-xl border-slate-200" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
          <FormField
            control={form.control}
            name="isUsed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-2xl border p-4 shadow-sm bg-white border-slate-100">
                <FormLabel className="font-bold cursor-pointer text-slate-700">المركبة مستعملة؟</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="installment"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-2xl border p-4 shadow-sm bg-white border-slate-100">
                <FormLabel className="font-bold cursor-pointer text-slate-700">قابلة للتقسيط؟</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel className="font-bold">وصف الإعلان</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  className="rounded-2xl border-slate-200 bg-slate-50 focus:bg-white transition-colors"
                  placeholder="اكتب تفاصيل إضافية عن حالة المركبة والمميزات..."
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}