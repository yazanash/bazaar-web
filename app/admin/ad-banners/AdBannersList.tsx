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
      <div className="flex justify-between items-center">
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

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden text-right">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-none">
              <TableHead className="p-5 text-right font-black w-62.5">
                البنار
              </TableHead>
              <TableHead className="text-right font-black">الوجهة</TableHead>
              <TableHead className="text-right font-black">
                فترة العرض
              </TableHead>
              <TableHead className="text-center font-black">
                الإجراءات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.map((banner) => (
              <TableRow
                key={banner.id}
                className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors"
              >
                <TableCell className="p-5">
                  <div className="relative h-24 rounded-2xl overflow-hidden border-2 border-slate-100 group shadow-sm bg-slate-50">
                    <img
                      src={getImageUrl(banner.imageUrl)}
                      alt="Banner"
                      className="w-full h-full object-contain transition-transform group-hover:scale-105"
                    />
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Link URL
                    </span>
                    <a
                      href={banner.link}
                      target="_blank"
                      className="text-blue-600 font-bold flex items-center gap-1 hover:underline text-sm"
                    >
                      {banner.link.length > 35
                        ? banner.link.substring(0, 35) + "..."
                        : banner.link}
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Calendar size={14} className="text-blue-500" />
                      من:{" "}
                      {new Date(banner.activationDate).toLocaleDateString(
                        "ar-EG",
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-red-500">
                      <Clock size={14} />
                      إلى:{" "}
                      {new Date(banner.expirationDate).toLocaleDateString(
                        "ar-EG",
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      onClick={() => handleOpenModal(banner)}
                      variant="ghost"
                      size="icon"
                      className="text-blue-500 hover:bg-blue-50 rounded-xl"
                    >
                      <Pencil size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:bg-red-50 rounded-xl"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
