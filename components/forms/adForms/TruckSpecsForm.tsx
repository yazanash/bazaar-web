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
import {
  ArabicLabels,
  TruckBodyType,
  TrucksUsageType,
} from "@/types/enums";

export function TruckSpecsSection({ form }: { form: any }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h3 className="text-lg font-bold text-blue-700">
        مواصفات الشاحنة التفصيلية
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="carSpecs.truckBodyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع الهيكل</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 rounded-xl border-blue-100">
                    <SelectValue placeholder="اختر نوع الهيكل" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(TruckBodyType).map((t) => (
                    <SelectItem key={t} value={t}>
                      {ArabicLabels.TruckBodyType[t]}
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
          name="carSpecs.trucksUsageType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع الاسنخدام</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 rounded-xl border-blue-100">
                    <SelectValue placeholder="اختر نوع الاستخدام" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(TrucksUsageType).map((t) => (
                    <SelectItem key={t} value={t}>
                      {ArabicLabels.TrucksUsageType[t]}
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
          name="carSpecs.isRegistered"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-xl border p-3 shadow-sm bg-white">
              <div className="space-y-0.5">
                <FormLabel>هل المركبة مسجلة؟</FormLabel>
              </div>
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
          name="truckSpecs.axisCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">عدد المحاور</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  className="h-12 rounded-xl border-slate-200"
                  placeholder="0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="truckSpecs.backstorageLenght"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">طول الصندوق الخلفي</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  className="h-12 rounded-xl border-slate-200"
                  placeholder="0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="truckSpecs.backstorageHeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">ارتفاع الصندوق الخلفي</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  className="h-12 rounded-xl border-slate-200"
                  placeholder="0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="truckSpecs.payload"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">الحمولة (طن)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  className="h-12 rounded-xl border-slate-200"
                  placeholder="0"
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
