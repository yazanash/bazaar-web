"use client";
import { useState, useTransition } from "react";
import { User, Phone, Save, Loader2 } from "lucide-react";
import { ProfileData } from "@/types/profile";
import { GenderType, SellerType } from "@/types/enums";
import { saveProfileAction } from "@/lib/actions/profile";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProfileForm({
  initialData,
}: {
  initialData?: ProfileData;
}) {
  const [isPending, startTransition] = useTransition();
  const isUpdate = !!initialData;

  const [formData, setFormData] = useState<ProfileData>({
    name: initialData?.name || "",
    phoneNumber: initialData?.phoneNumber || "",
    gender: initialData?.gender ?? GenderType.Male,
    sellerType: initialData?.sellerType ?? SellerType.Owner,
    birthDate: (initialData?.birthDate
      ? new Date(initialData.birthDate).toISOString().split("T")[0]
      : "") as unknown as Date,
  });
  const handleSave = () => {
    startTransition(async () => {
      const result = await saveProfileAction(formData, isUpdate);
      if (result.success) {
        alert("تم حفظ الملف الشخصي بنجاح!");
      } else {
        alert("حدث خطأ أثناء الحفظ");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 pb-24" dir="rtl">
      <div className="text-center mb-10 mt-4">
        <h2 className="text-2xl font-black text-blue-900">الملف الشخصي</h2>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* الاسم */}
        <div className="space-y-2">
          <Label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-widest">
            الاسم الكامل
          </Label>
          <div className="relative">
            <User
              className="absolute right-4 top-3.5 text-slate-300"
              size={18}
            />
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full h-12 bg-white rounded-2xl pr-12 pl-4 text-sm font-bold border border-slate-100 outline-none"
            />
          </div>
        </div>

        {/* الهاتف */}
        <div className="space-y-2">
          <Label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-widest">
            رقم الهاتف
          </Label>
          <div className="relative">
            <Phone
              className="absolute right-4 top-3.5 text-slate-300"
              size={18}
            />
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              dir="ltr"
              className="w-full h-12 bg-white rounded-2xl pr-12 pl-4 text-sm font-bold border border-slate-100 text-right"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* الجنس - التصحيح هنا */}
          <div className="space-y-2">
            <Label className="text-xs font-black text-slate-500 mr-1">
              الجنس
            </Label>
            <Select
              value={formData.gender.toString()}
              onValueChange={(v) =>
                setFormData({ ...formData, gender: v as GenderType })
              }
            >
              <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl font-bold shadow-sm">
                <SelectValue placeholder="اختر" />
              </SelectTrigger>
              <SelectContent className="z-200">
                <SelectItem
                  value={GenderType.Male.toString()}
                  className="font-bold text-right"
                >
                  ذكر
                </SelectItem>
                <SelectItem
                  value={GenderType.Female.toString()}
                  className="font-bold text-right"
                >
                  أنثى
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* التاريخ */}
          <div className="space-y-2">
            <Label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-widest">
              تاريخ الميلاد
            </Label>
            <input
              type="date"
              value={formData.birthDate as unknown as string}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  birthDate: e.target.value as unknown as Date,
                })
              }
              className="w-full h-12 bg-white rounded-2xl pr-4 pl-4 text-sm font-bold border border-slate-100"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isPending}
          className="w-full h-14 bg-blue-600 text-white rounded-2xl font-black shadow-xl disabled:bg-slate-300 flex items-center justify-center gap-2 mt-10 active:scale-95 transition-all"
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Save size={20} />
          )}
          {isUpdate ? "تحديث التعديلات" : "حفظ لأول مرة"}
        </button>
      </div>
    </div>
  );
}
