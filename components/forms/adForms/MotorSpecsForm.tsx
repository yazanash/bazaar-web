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
import { ArabicLabels, MotorTransmission, MotorBodyType } from "@/types/enums";

export function MotorSpecsSection({ form }: { form: any }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h3 className="text-lg font-bold text-blue-700">
        مواصفات السيارة التفصيلية
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="motorSpecs.motorTransmission"
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
                  {Object.values(MotorTransmission).map((t) => (
                    <SelectItem key={t} value={t}>
                      {ArabicLabels.MotorTransmission[t]}
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
          name="motorSpecs.motorBodyType"
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
                  {Object.values(MotorBodyType).map((t) => (
                    <SelectItem key={t} value={t}>
                      {ArabicLabels.MotorBodyType[t]}
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
          name="motorSpecs.isModified"
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

        {form.watch("motorSpecs.IsModified") && (
          <FormField
            control={form.control}
            name="motorSpecs.ةodificationDescription"
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
      </div>
    </div>
  );
}
