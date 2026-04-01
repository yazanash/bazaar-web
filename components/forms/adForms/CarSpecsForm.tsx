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
  EnglishLabels,
} from "@/types/enums";
import { useLocale, useTranslations } from "next-intl";

export function CarSpecsSection({ form }: { form: any }) {
  const t = useTranslations("ads.carSpecs");
  const locale = useLocale();
  const isArabic = locale === "ar";
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h3 className="text-lg font-bold text-blue-700">{t("title")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="carSpecs.transmission"
          render={({ field }) => (
            <FormItem>
              <FormLabel> {t("transmission")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 w-full rounded-xl border-blue-100">
                    <SelectValue placeholder="----" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Transmission).map((t) => (
                    <SelectItem key={t} value={t}>
                      {isArabic
                        ? ArabicLabels.Transmission[t]
                        : EnglishLabels.Transmission[t]}
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
              <FormLabel>{t("carBodyType")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 w-full rounded-xl border-blue-100">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(CarBodyType).map((t) => (
                    <SelectItem key={t} value={t}>
                      {isArabic
                        ? ArabicLabels.CarBodyType[t]
                        : EnglishLabels.CarBodyType[t]}
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
              <FormLabel>{t("registrationType")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 w-full rounded-xl border-blue-100">
                    <SelectValue placeholder="----" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(RegistrationType).map((t) => (
                    <SelectItem key={t} value={t}>
                      {isArabic
                        ? ArabicLabels.RegistrationType[t]
                        : EnglishLabels.RegistrationType[t]}
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
              <FormLabel>{t("driveSystem")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 w-full rounded-xl border-blue-100">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(DriveSystem).map((t) => (
                    <SelectItem key={t} value={t}>
                      {isArabic
                        ? ArabicLabels.DriveSystem[t]
                        : EnglishLabels.DriveSystem[t]}
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

        {form.watch("carSpecs.isModified") && (
          <FormField
            control={form.control}
            name="carSpecs.modificationDescription"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>{t("modificationDescription")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder={t("modificationDescriptionPlaceholder")}
                    className="h-12 w-full rounded-xl"
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
              <FormLabel className="font-bold">{t("seatsCount")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value ?? 0}
                  className="h-12 w-full rounded-xl border-slate-200"
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
              <FormLabel className="font-bold">{t("doorsCount")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value ?? 0}
                  className="h-12 w-full rounded-xl border-slate-200"
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
              <FormLabel>{t("usageType")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 w-full rounded-xl border-blue-100">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(UsageType).map((t) => (
                    <SelectItem key={t} value={t}>
                      {isArabic
                        ? ArabicLabels.UsageType[t]
                        : EnglishLabels.UsageType[t]}
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
