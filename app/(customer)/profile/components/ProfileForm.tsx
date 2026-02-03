"use client";
import { useState } from "react";
import {
  User,
  Phone,
  VenusAndMars,
  Calendar as CalendarIcon,
  Save,
  Camera,
} from "lucide-react";

export default function ProfileForm({ initialData }: { initialData?: any }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    gender: initialData?.gender || "male",
    birthDate: initialData?.birthDate || "",
  });

  const handleSave = () => {
    console.log("Saving data:", formData);
    // هنا نضع استدعاء الـ API للتحديث
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 pb-24" dir="rtl">
      {/* هيدر الصفحة */}
      <div className="text-center mb-10 mt-4">
        <h2 className="text-2xl font-black text-blue-900">الملف الشخصي</h2>
        <p className="text-slate-400 text-sm font-bold mt-1">
          أكمل بياناتك ليثق بك المشترون
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* حقل الاسم */}
        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-widest">
            الاسم الكامل
          </label>
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
              placeholder="مثال: أحمد سليمان"
              className="w-full h-12 bg-white rounded-2xl pr-12 pl-4 text-sm font-bold text-slate-700 shadow-sm border border-slate-100 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* حقل رقم الهاتف */}
        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-widest">
            رقم الهاتف
          </label>
          <div className="relative">
            <Phone
              className="absolute right-4 top-3.5 text-slate-300"
              size={18}
            />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="09xx xxx xxx"
              dir="ltr"
              className="w-full h-12 bg-white rounded-2xl pr-12 pl-4 text-sm font-bold text-slate-700 shadow-sm border border-slate-100 focus:border-blue-500 outline-none transition-all text-right"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* حقل الجنس */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-widest">
              الجنس
            </label>
            <div className="relative">
              <VenusAndMars
                className="absolute right-4 top-3.5 text-slate-300"
                size={18}
              />
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="w-full h-12 bg-white rounded-2xl pr-12 pl-4 text-sm font-bold text-slate-700 shadow-sm border border-slate-100 focus:border-blue-500 outline-none appearance-none cursor-pointer"
              >
                <option value="male">ذكر</option>
                <option value="female">أنثى</option>
              </select>
            </div>
          </div>

          {/* حقل تاريخ الميلاد */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-widest">
              تاريخ الميلاد
            </label>
            <div className="relative">
              <CalendarIcon
                className="absolute right-4 top-3.5 text-slate-300"
                size={18}
              />
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                className="w-full h-12 bg-white rounded-2xl pr-12 pl-4 text-sm font-bold text-slate-700 shadow-sm border border-slate-100 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* زر الحفظ العائم أو الثابت */}
        <button
          onClick={handleSave}
          className="w-full h-14 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-100 flex items-center justify-center gap-2 mt-10 active:scale-95 transition-transform"
        >
          <Save size={20} />
          حفظ التعديلات
        </button>
      </div>
    </div>
  );
}
