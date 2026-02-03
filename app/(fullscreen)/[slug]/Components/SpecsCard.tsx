export function SpecsCard({ category, specs }: { category: string, specs: any }) {
  if (!specs) return null;

  return (
    <section className="px-4">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h2 className="font-black text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          المواصفات الفنية
        </h2>
        
        <div className="grid grid-cols-2 gap-y-6">
          {category === "passenger" && (
            <>
              <SpecItem label="الناقل" value={specs.transmission} />
              <SpecItem label="التسجيل" value={specs.registrationType} />
              <SpecItem label="الهيكل" value={specs.carBodyType} />
              <SpecItem label="الدفع" value={specs.driveSystem} />
              <SpecItem label="المقاعد" value={specs.seatsCount} />
              <SpecItem label="الأبواب" value={specs.doorsCount} />
            </>
          )}
          {category === "truck" && (
            <>
              <SpecItem label="المحاور" value={specs.axisCount} />
              <SpecItem label="الحمولة" value={`${specs.payload} طن`} />
              <SpecItem label="طول الصندوق" value={`${specs.backstorageLenght} م`} />
              <SpecItem label="الاستخدام" value={specs.trucksUsageType} />
            </>
          )}
          {category === "motor" && (
            <>
              <SpecItem label="ناقل الموتور" value={specs.motorTransmission} />
              <SpecItem label="مسجل" value={specs.isRegistered ? "نعم" : "لا"} />
              <SpecItem label="نوع الهيكل" value={specs.motorBodyType} />
            </>
          )}
        </div>
        
        {specs.isModified && (
          <div className="mt-6 p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <p className="text-xs font-bold text-orange-800 mb-1">التعديلات:</p>
            <p className="text-sm text-orange-700 font-medium">{specs.modificationDescription}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function SpecItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-black text-slate-700">{value || "غير محدد"}</p>
    </div>
  );
}