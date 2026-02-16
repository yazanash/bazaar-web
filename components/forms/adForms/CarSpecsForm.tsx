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
  Transmission,
  CarBodyType,
  ArabicLabels,
  RegistrationType,
  DriveSystem,
  UsageType,
} from "@/types/enums";

export function CarSpecsSection({ form }: { form: any }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h3 className="text-lg font-bold text-blue-700">
        مواصفات السيارة التفصيلية
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="carSpecs.transmission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ناقل الحركة</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 rounded-xl border-blue-100">
                    <SelectValue placeholder="آلي / عادي" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Transmission).map((t) => (
                    <SelectItem key={t} value={t}>
                      {ArabicLabels.Transmission[t]}
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
          name="carSpecs.carBodyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الهيكل</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 rounded-xl border-blue-100">
                    <SelectValue placeholder="اختر نوع الهيكل" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(CarBodyType).map((t) => (
                    <SelectItem key={t} value={t}>
                      {ArabicLabels.CarBodyType[t]}
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
          name="carSpecs.registrationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>التسجيل</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 rounded-xl border-blue-100">
                    <SelectValue placeholder="اختر نوع التسجيل" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(RegistrationType).map((t) => (
                    <SelectItem key={t} value={t}>
                      {ArabicLabels.RegistrationType[t]}
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
          name="carSpecs.driveSystem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نظام الدفع</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 rounded-xl border-blue-100">
                    <SelectValue placeholder="اختر نظام الدفع " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(DriveSystem).map((t) => (
                    <SelectItem key={t} value={t}>
                      {ArabicLabels.DriveSystem[t]}
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
          name="carSpecs.isModified"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-xl border p-3 shadow-sm bg-white">
              <div className="space-y-0.5">
                <FormLabel>هل المركبة معدلة؟</FormLabel>
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

        {form.watch("carSpecs.isModified") && (
          <FormField
            control={form.control}
            name="carSpecs.modificationDescription"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>تفاصيل التعديل</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="اذكر التعديلات التي تمت على السيارة..."
                    className="h-12 rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="carSpecs.seatsCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">عدد المقاعد</FormLabel>
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
          name="carSpecs.doorsCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">عدد الابواب</FormLabel>
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
          name="carSpecs.usageType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع الاستخدام</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 rounded-xl border-blue-100">
                    <SelectValue placeholder="اختر نوع الاستخدام " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(UsageType).map((t) => (
                    <SelectItem key={t} value={t}>
                      {ArabicLabels.UsageType[t]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
