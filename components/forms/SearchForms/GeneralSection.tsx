import {
  MapPin,
  CreditCard,
  Search,
  Banknote,
  Fuel,
  CalendarDays,
} from "lucide-react";
import {
  Category,
  ArabicLabels,
  FuelType,
  PostDateFilter,
} from "@/types/enums";
import { GeneralFilter } from "@/types/filters";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  CityResponse,
  ManufacturerModelResponse,
  ManufacturerResponse,
} from "@/types/ad";

interface Props {
  states: GeneralFilter;
  setStates: (val: Partial<GeneralFilter>) => void;
  cities: CityResponse[];
  models: ManufacturerModelResponse[];
  manufacturers: ManufacturerResponse[];
}

export const GeneralSection = ({
  states,
  setStates,
  cities,
  models,
  manufacturers,
}: Props) => {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <Label className="text-xs font-black text-slate-400 mr-1 uppercase">
          البحث الذكي
        </Label>
        <div className="relative">
          <Input
            type="text"
            value={states.Keyword || ""}
            onChange={(e) => setStates({ Keyword: e.target.value })}
            placeholder="ماركة، موديل، أو كلمة دلالية..."
            className="h-14 bg-slate-50 border-slate-200 rounded-2xl pr-12 font-bold text-slate-700 focus-visible:ring-blue-500 transition-all"
          />
          <Search className="absolute right-4 top-4 text-slate-400" size={20} />
        </div>
      </section>

      <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl">
        {[Category.Passenger, Category.Motorcycles, Category.Trucks].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setStates({ Category: cat })}
              className={`py-3 px-1 rounded-xl text-xs font-black transition-all ${
                states.Category === cat
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {ArabicLabels.Category[cat]}
            </button>
          ),
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-bold text-slate-600 flex items-center gap-2">
            <MapPin size={16} className="text-blue-500" /> المدينة
          </Label>
          <Select
            value={states.CityId?.toString()}
            onValueChange={(v) => setStates({ CityId: Number(v) })}
          >
            <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold">
              <SelectValue placeholder="كل المدن" />
            </SelectTrigger>

            <SelectContent className="z-200">
              {cities?.map((city) => (
                <SelectItem key={city.id} value={String(city.id)}>
                  {city.arabicName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-bold text-slate-600 flex items-center gap-2">
            <Search size={16} className="text-blue-500" /> المصنع
          </Label>
          <Select
            value={states.ManufacturerId?.toString()}
            onValueChange={(v) => setStates({ ManufacturerId: Number(v) })}
          >
            <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold">
              <SelectValue placeholder="كل المصانع" />
            </SelectTrigger>
            <SelectContent className="z-200">
              {manufacturers?.map((manufacturer) => (
                <SelectItem
                  key={manufacturer.id}
                  value={String(manufacturer.id)}
                >
                  {manufacturer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-bold text-slate-600 flex items-center gap-2">
            <Search size={16} className="text-blue-500" /> الماركة
          </Label>
          <Select
            value={states.VehicleModelId?.toString()}
            onValueChange={(v) => setStates({ VehicleModelId: Number(v) })}
          >
            <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold">
              <SelectValue placeholder="كل الماركات" />
            </SelectTrigger>
            <SelectContent className="z-200">
              {models?.map((model) => (
                <SelectItem key={model.id} value={String(model.id)}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <CreditCard size={18} className="text-blue-600" />
            </div>
            <span className="font-bold text-slate-700">مستعمل فقط</span>
          </div>
          <Switch
            checked={states.IsUsed}
            onCheckedChange={(v) => setStates({ IsUsed: v })}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Banknote size={18} className="text-green-600" />
            </div>
            <span className="font-bold text-slate-700">متاح للتقسيط</span>
          </div>
          <Switch
            checked={states.Installment}
            onCheckedChange={(v) => setStates({ Installment: v })}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-bold text-slate-600">
          نطاق السعر ($)
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            placeholder="من"
            value={states.PriceFrom || ""}
            onChange={(e) => setStates({ PriceFrom: Number(e.target.value) })}
            className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold focus-visible:ring-blue-500"
          />
          <Input
            type="number"
            placeholder="إلى"
            value={states.PriceTo || ""}
            onChange={(e) => setStates({ PriceTo: Number(e.target.value) })}
            className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold focus-visible:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <Fuel size={14} /> الوقود
          </Label>
          <Select
            value={states.FuelType}
            onValueChange={(v) => setStates({ FuelType: v as FuelType })}
          >
            <SelectTrigger className="h-11 bg-white border-slate-200 rounded-xl font-bold text-xs">
              <SelectValue placeholder="الكل" />
            </SelectTrigger>
            <SelectContent className="z-200">
              {Object.values(FuelType).map((f) => (
                <SelectItem key={f} value={f} className="text-xs font-bold">
                  {ArabicLabels.FuelType[f]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <CalendarDays size={14} /> التاريخ
          </Label>
          <Select
            value={states.PostDate}
            onValueChange={(v) => setStates({ PostDate: v as PostDateFilter })}
          >
            <SelectTrigger className="h-11 bg-white border-slate-200 rounded-xl font-bold text-xs">
              <SelectValue placeholder="أي وقت" />
            </SelectTrigger>
            <SelectContent className="z-200">
              {Object.values(PostDateFilter).map((d) => (
                <SelectItem key={d} value={d} className="text-xs font-bold">
                  {ArabicLabels.PostDateFilter[d]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
