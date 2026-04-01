import { ArabicLabels, EnglishLabels } from "@/types/enums";
import { useLocale, useTranslations } from "next-intl";

export function SpecsCard({
  category,
  specs,
}: {
  category: string;
  specs: any;
}) {
  const t = useTranslations("ads.generalForm");
  const tCar = useTranslations("ads.carSpecs");
  const tTruck = useTranslations("ads.truckSpecs");
  const tMotor = useTranslations("ads.motorSpecs");

  const locale = useLocale();
  const isArabic = locale === "ar";
  if (!specs) return null;

  return (
    <section className="px-4">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h2 className="font-black text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          {t("specsTitle")}
        </h2>

        <div className="grid grid-cols-2 gap-y-6">
          {category === "passenger" && (
            <>
              <SpecItem
                label={tCar("transmission")}
                value={
                  isArabic
                    ? ArabicLabels.Transmission[specs.transmission]
                    : EnglishLabels.Transmission[specs.transmission]
                }
              />
              <SpecItem
                label={tCar("registrationType")}
                value={
                  isArabic
                    ? ArabicLabels.RegistrationType[specs.registrationType]
                    : EnglishLabels.RegistrationType[specs.registrationType]
                }
              />
              <SpecItem
                label={tCar("carBodyType")}
                value={
                  isArabic
                    ? ArabicLabels.CarBodyType[specs.carBodyType]
                    : EnglishLabels.CarBodyType[specs.carBodyType]
                }
              />
              <SpecItem
                value={
                  isArabic
                    ? ArabicLabels.DriveSystem[specs.driveSystem]
                    : EnglishLabels.DriveSystem[specs.driveSystem]
                }
                label={tCar("driveSystem")}
              />
              <SpecItem
                label={tCar("isModified")}
                value={
                  specs.isModified
                    ? tCar("isModifiedYes")
                    : tCar("isModifiedNo")
                }
              />
              <SpecItem label={tCar("seatsCount")} value={specs.seatsCount} />
              <SpecItem label={tCar("doorsCount")} value={specs.doorsCount} />
            </>
          )}
          {category === "truck" && (
            <>
              <SpecItem label={tTruck("axisCount")} value={specs.axisCount} />
              <SpecItem label={tTruck("payload")} value={`${specs.payload}`} />
              <SpecItem
                label={tTruck("backstorageLenght")}
                value={`${specs.backstorageLenght}`}
              />
              <SpecItem
                label={tTruck("trucksUsageType")}
                value={
                  isArabic
                    ? ArabicLabels.TrucksUsageType[specs.trucksUsageType]
                    : EnglishLabels.TrucksUsageType[specs.trucksUsageType]
                }
              />
            </>
          )}
          {category === "motor" && (
            <>
              <SpecItem
                label={tMotor("motorTransmission")}
                value={
                  isArabic
                    ? ArabicLabels.MotorTransmission[specs.motorTransmission]
                    : EnglishLabels.MotorTransmission[specs.motorTransmission]
                }
              />
              <SpecItem
                label={tMotor("isRegistered")}
                value={
                  specs.isRegistered
                    ? tMotor("isRegisteredYes")
                    : tMotor("isRegisteredNo")
                }
              />
              <SpecItem
                label={tMotor("motorBodyType")}
                value={
                  isArabic
                    ? ArabicLabels.MotorBodyType[specs.motorBodyType]
                    : EnglishLabels.MotorBodyType[specs.motorBodyType]
                }
              />
            </>
          )}
        </div>

        {specs.isModified && (
          <div className="mt-6 p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <p className="text-xs font-bold text-orange-800 mb-1">
              {tCar("modificationDescription")}
            </p>
            <p className="text-sm text-orange-700 font-medium">
              {specs.modificationDescription}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  const t = useTranslations("ads.generalForm");
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm font-black text-slate-700">
        {value || t("notSpecific")}
      </p>
    </div>
  );
}
