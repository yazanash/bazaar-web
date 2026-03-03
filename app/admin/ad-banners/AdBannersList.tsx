"use client";

import { useState, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Calendar,
  Image as ImageIcon,
  Clock,
  UploadCloud,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AdBannerRequest, AdBannerAdminResponse } from "@/types/adBanner";
import { getImageUrl } from "@/lib/utils";
import { createAdBanner, updateAdBanner } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";
interface AdBannersProps {
  banners: AdBannerAdminResponse[];
}

export default function AdBannersList({
  banners: initialBanners,
}: AdBannersProps) {
  const router = useRouter();
  const [banners, setBanners] = useState(initialBanners);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] =
    useState<AdBannerAdminResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // فورم الرفع - مطابق لـ AdBannerRequest
  const [formData, setFormData] = useState<Omit<AdBannerRequest, "image">>({
    link: "",
    activationDate: new Date().toISOString().split("T")[0],
    durationDays: 7,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // تنظيف الـ Preview URL عند إغلاق المودال لمنع تسرب الذاكرة
  useEffect(() => {
    return () => {
      if (previewUrl && !previewUrl.startsWith("http")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  const calculateDuration = (start: string, end: string): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffTime = endDate.getTime() - startDate.getTime();

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 7;
  };
  const handleOpenModal = (banner?: AdBannerAdminResponse) => {
    if (banner) {
      // حالة التعديل
      setEditingBanner(banner);
      setFormData({
        link: banner.link,
        activationDate: banner.activationDate.split("T")[0],
        durationDays: calculateDuration(
          banner.activationDate,
          banner.expirationDate,
        ),
      });
      setPreviewUrl(getImageUrl(banner.imageUrl));
    } else {
      setEditingBanner(null);
      setFormData({
        link: "",
        activationDate: new Date().toISOString().split("T")[0],
        durationDays: 7,
      });
      setPreviewUrl(null);
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (previewUrl && !previewUrl.startsWith("http"))
        URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!formData.link || !formData.activationDate) {
      alert("يرجى ملء جميع الحقول الأساسية");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("Link", formData.link);
      data.append("ActivationDate", formData.activationDate);
      data.append("DurationDays", formData.durationDays.toString());

      if (selectedFile) {
        data.append("ImageUrl", selectedFile);
      }

      if (editingBanner) {
        const res = await updateAdBanner(editingBanner.id, data);
        if (res.success) {
          alert("success");
        } else {
          alert(`failed : ${res.status} - ${res.message}`);
        }
      } else {
        if (!selectedFile) {
          alert("يرجى اختيار صورة");
          setLoading(false);
          return;
        }
        const res = await createAdBanner(data);
        if (res.success) {
          alert("success");
        } else {
          alert(`failed : ${res.status} - ${res.message}`);
        }
      }

      setIsModalOpen(false);
      // لإعادة تحديث الصفحة وجلب البيانات الجديدة من السيرفر
      router.refresh();
    } catch (error: any) {
      console.error("Error saving banner:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id: number) => {
    const isConfirmed = confirm("هل أنت متأكد من حذف هذا البنار نهائياً؟");

    if (isConfirmed) {
      try {
        // await api.delete(`/AdminBanner/DeleteBanner/${id}`);
        // تحديث الحالة محلياً لحذف العنصر من الجدول فوراً
        setBanners((prev) => prev.filter((b) => b.id !== id));
      } catch (error) {}
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-col md:flex-row space-y-1 ">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            المساحات الإعلانية
          </h1>
          <p className="text-slate-500 font-bold mt-1">
            تحكم في ظهور الإعلانات والجدولة الزمنية
          </p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="rounded-2xl h-12 bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-100 px-6 transition-all active:scale-95"
        >
          <Plus className="ml-2" size={20} /> إضافة إعلان جديد
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="group bg-white p-4 rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col md:flex-row items-center gap-6"
          >
            {/* 1. الصورة - على اليمين */}
            <div className="relative w-full md:w-48 h-32 shrink-0 rounded-2xl bg-slate-50 border border-slate-50 overflow-hidden flex items-center justify-center p-4">
              <img
                src={getImageUrl(banner.imageUrl)}
                alt="Banner"
                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* 2. المعلومات الأساسية - في الوسط */}
            <div className="flex-1 flex flex-col gap-2 min-w-0 w-full text-right">
              <div className="flex items-center gap-2">
                <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider">
                  Active Ad
                </span>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Target Link
                </h3>
              </div>

              <a
                href={banner.link}
                target="_blank"
                className="text-slate-800 font-bold text-sm hover:text-blue-600 transition-colors truncate block"
                title={banner.link}
              >
                {banner.link}
              </a>

              {/* التواريخ بشكل أفقي ناعم */}
              <div className="flex items-center gap-6 mt-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[11px] font-bold text-slate-500">
                    بداية:{" "}
                    {new Date(banner.activationDate).toLocaleDateString(
                      "ar-EG",
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                  <span className="text-[11px] font-bold text-slate-500">
                    نهاية:{" "}
                    {new Date(banner.expirationDate).toLocaleDateString(
                      "ar-EG",
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. الأزرار - على اليسار */}
            <div className="flex items-center gap-2 shrink-0 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-slate-50">
              <Button
                onClick={() => handleOpenModal(banner)}
                variant="outline"
                className="flex-1 md:flex-none h-12 md:w-32 rounded-2xl border-slate-100 text-slate-700 font-black text-xs hover:bg-slate-900 hover:text-white transition-all"
              >
                <Pencil size={14} className="ml-2" />
                تعديل
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-2xl text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* مودال الإضافة والتعديل */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="max-w-xl rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl max-h-[90vh] flex flex-col"
          dir="rtl"
        >
          {/* 1. الرأس - ثابت في الأعلى */}
          <div className="p-8 pb-4 bg-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-right flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <ImageIcon className="text-blue-600" size={24} />
                </div>
                {editingBanner ? "تعديل بيانات البنار" : "إنشاء إعلان جديد"}
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* 2. منطقة المحتوى - هي التي تحتوي على السكرول */}
          <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-6 custom-scrollbar">
            <div className="space-y-6">
              {/* منطقة الرفع */}
              <div className="space-y-3">
                <Label className="font-black text-slate-700 mr-1 text-base">
                  تصميم الإعلان
                </Label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative h-48 rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all overflow-hidden"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      className="w-full h-full object-contain p-2"
                      alt="Preview"
                    />
                  ) : (
                    <div className="text-center space-y-2">
                      <div className="p-4 bg-white rounded-2xl shadow-sm inline-block mx-auto">
                        <UploadCloud className="text-blue-600" size={32} />
                      </div>
                      <p className="text-sm font-black text-slate-400">
                        اضغط للاختيار
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* الرابط */}
              <div className="space-y-2">
                <Label className="font-bold mr-1">رابط الوجهة (URL)</Label>
                <Input
                  placeholder="https://example.com/promotion"
                  className="h-12 rounded-xl border-slate-200 font-bold focus:ring-blue-100"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                />
              </div>

              {/* التواريخ */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold mr-1">تاريخ التفعيل</Label>
                  <div className="relative">
                    <Input
                      type="date"
                      className="h-12 rounded-xl border-slate-200 font-bold pr-10"
                      value={formData.activationDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          activationDate: e.target.value,
                        })
                      }
                    />
                    <Calendar
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      size={18}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold mr-1">المدة (أيام)</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      min="1"
                      className="h-12 rounded-xl border-slate-200 font-bold pr-10"
                      value={formData.durationDays}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          durationDays: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                    <Clock
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      size={18}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. التذييل (Footer) - ثابت في الأسفل */}
          <div className="p-8 bg-slate-50 border-t flex flex-row-reverse gap-3">
            <Button
              disabled={loading}
              onClick={handleSubmit}
              className="flex-1 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-black text-lg shadow-lg shadow-blue-100 transition-all active:scale-95"
            >
              {loading
                ? "جاري الحفظ..."
                : editingBanner
                  ? "حفظ التعديلات"
                  : "نشر الإعلان"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 h-14 rounded-2xl font-bold text-slate-500 hover:bg-slate-100"
            >
              إلغاء
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
