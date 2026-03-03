"use client";

import { useState } from "react";
import { Package } from "@/types/package";
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
import {
  Plus,
  Pencil,
  Trash2,
  PackageIcon,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { createPackage, updatePackage } from "@/lib/actions/packages";
interface PackageProps {
  packages: Package[];
}
export default function PackagesList({ packages }: PackageProps) {
  const [allPackages, setAllPackages] = useState(packages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Package>({
    id: 0,
    name: "",
    adLimits: 0,
    featuredLimit: 0,
    price: 0,
  });
  const handleOpenModal = (pkg?: Package) => {
    setEditingPackage(pkg || null);
    setIsModalOpen(true);
  };
  const onCreated = (newPkg: Package) =>
    setAllPackages((prev) => [newPkg, ...prev]);
  const onUpdated = (updatedPkg: Package) =>
    setAllPackages((prev) =>
      prev.map((p) => (p.id === updatedPkg.id ? updatedPkg : p)),
    );

  const handleSubmit = async () => {
    setLoading(true);
    try {
      setLoading(true);
      try {
        if (editingPackage) {
          const res = await updatePackage(formData);
          if (res.success && res.data) onUpdated(res.data);
        } else {
          const res = await createPackage(formData);
          if (res.success && res.data) onCreated(res.data);
        }

        setIsModalOpen(false);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
            <PackageIcon size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              إدارة الباقات
            </h1>
            <p className="text-sm font-bold text-slate-500">
              تحكم بأسعار ومميزات عضويات المشتركين
            </p>
          </div>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="rounded-xl h-12 bg-blue-600 font-bold"
        >
          <Plus className="ml-2" size={20} />
          إضافة باقة
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {allPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="group bg-white p-5 rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col md:flex-row items-center gap-6"
          >
            {/* 1. اسم الباقة والمعرف */}
            <div className="flex flex-col gap-1 min-w-45 w-full md:w-auto">
              <span className="text-[10px] font-black text-blue-500 bg-blue-50 w-fit px-2 py-0.5 rounded-lg mb-1">
                PACKAGE #{pkg.id}
              </span>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">
                {pkg.name}
              </h3>
            </div>

            {/* 2. المميزات (حد الإعلانات والمميزة) */}
            <div className="flex-1 grid grid-cols-2 gap-4 w-full md:w-auto">
              {/* حد الإعلانات */}
              <div className="flex flex-col gap-1 border-r border-slate-50 pr-4">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  حد الإعلانات
                </span>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <LayoutDashboard size={14} className="text-slate-400" />
                  {pkg.adLimits} إعلان
                </div>
              </div>

              {/* إعلانات مميزة */}
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">
                  إعلانات مميزة
                </span>
                <div className="flex items-center gap-2 text-sm font-bold text-blue-600">
                  <ShieldCheck size={16} />
                  {pkg.featuredLimit} تمييز
                </div>
              </div>
            </div>

            {/* 3. السعر - بشكل بارز */}
            <div className="flex flex-col items-center md:items-end min-w-30 px-6 py-2 md:py-0 bg-slate-50 md:bg-transparent rounded-2xl w-full md:w-auto">
              <span className="text-[9px] font-black text-slate-400 uppercase mb-1">
                السعر الحالي
              </span>
              <div className="text-xl font-black text-slate-900">
                {pkg.price.toLocaleString()}{" "}
                <span className="text-xs text-slate-400 font-bold">ل.س</span>
              </div>
            </div>

            {/* 4. الإجراءات */}
            <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-slate-50">
              <Button
                onClick={() => handleOpenModal(pkg)}
                variant="outline"
                className="flex-1 md:flex-none h-12 md:w-12 rounded-2xl border-slate-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
              >
                <Pencil size={18} />
              </Button>
              <Button
                variant="outline"
                className="flex-1 md:flex-none h-12 md:w-12 rounded-2xl border-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* مودال الإضافة والتعديل */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-106.25 rounded-[2rem]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-right">
              {editingPackage ? "تعديل باقة" : "إضافة باقة جديدة"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2 text-right">
              <Label className="font-bold">اسم الباقة</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="مثال: الباقة الذهبية"
                className="rounded-xl h-11"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 text-right">
                <Label className="font-bold">حد الإعلانات</Label>
                <Input
                  type="number"
                  value={formData.adLimits}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      adLimits: Number(e.target.value),
                    })
                  }
                  className="rounded-xl h-11"
                />
              </div>
              <div className="space-y-2 text-right">
                <Label className="font-bold">إعلانات مميزة</Label>
                <Input
                  type="number"
                  value={formData.featuredLimit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featuredLimit: Number(e.target.value),
                    })
                  }
                  className="rounded-xl h-11"
                />
              </div>
            </div>
            <div className="space-y-2 text-right">
              <Label className="font-bold">السعر</Label>
              <Input
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: Number(e.target.value),
                  })
                }
                placeholder="مثال: 100,000"
                className="rounded-xl h-11"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row-reverse gap-3 mt-4">
            <Button
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-blue-600 font-bold h-11 rounded-xl"
            >
              {loading ? "جاري الحفظ..." : "حفظ"}
            </Button>
            <Button
              variant="ghost"
              className="w-full font-bold h-11 rounded-xl"
              onClick={() => setIsModalOpen(false)}
            >
              إلغاء
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
