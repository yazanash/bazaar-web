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
  MotorTransmission,
  MotorBodyType,
  EnglishLabels,
} from "@/types/enums";
import { useLocale, useTranslations } from "next-intl";

export function MotorSpecsSection({ form }: { form: any }) {
  const t = useTranslations("ads.motorSpecs");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h3 className="text-lg font-bold text-blue-700">{t("title")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="motorSpecs.motorTransmission"
          render={({ field }) => (
            <FormItem>
              <FormLabel> {t("motorTransmission")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 w-full rounded-xl border-blue-100">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(MotorTransmission).map((t) => (
                    <SelectItem key={t} value={t}>
                      {isArabic
                        ? ArabicLabels.MotorTransmission[t]
                        : EnglishLabels.MotorTransmission[t]}
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
              <FormLabel>{t("motorBodyType")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 w-full rounded-xl border-blue-100">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(MotorBodyType).map((t) => (
                    <SelectItem key={t} value={t}>
                      {isArabic
                        ? ArabicLabels.MotorBodyType[t]
                        : EnglishLabels.MotorBodyType[t]}
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
            <FormItem className="flex w-full flex-row items-center justify-between rounded-xl border p-3 shadow-sm bg-white">
              <div className="space-y-0.5">
                <FormLabel>{t("isModified")}</FormLabel>
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

        {form.watch("motorSpecs.isModified") && (
          <FormField
            control={form.control}
            name="motorSpecs.modificationDescription"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel> {t("modificationDescription")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("modificationDescriptionPlaceholder")}
                    className="h-12  w-full rounded-xl"
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
