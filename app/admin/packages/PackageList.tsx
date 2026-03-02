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
import { Plus, Pencil, Trash2, PackageIcon, ShieldCheck } from "lucide-react";
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

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="border-none">
              <TableHead className="p-5 text-right font-black w-12.5">
                ID
              </TableHead>
              <TableHead className="text-right font-black">
                اسم الباقة
              </TableHead>
              <TableHead className="text-right font-black">
                حد الإعلانات
              </TableHead>
              <TableHead className="text-right font-black">
                إعلانات مميزة
              </TableHead>
              <TableHead className="text-right font-black">
                السعر (ل.س)
              </TableHead>
              <TableHead className="text-center font-black">
                الإجراءات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allPackages.map((pkg) => (
              <TableRow
                key={pkg.id}
                className="hover:bg-slate-50/50 transition-colors border-b border-slate-50"
              >
                <TableCell className="p-5 font-bold text-slate-400">
                  #{pkg.id}
                </TableCell>
                <TableCell className="font-black text-slate-800">
                  {pkg.name}
                </TableCell>
                <TableCell className="font-bold text-slate-600">
                  {pkg.adLimits}
                </TableCell>
                <TableCell className="font-bold text-blue-600">
                  <div className="flex items-center gap-1">
                    <ShieldCheck size={14} />
                    {pkg.featuredLimit}
                  </div>
                </TableCell>
                <TableCell className="font-black text-slate-900">
                  {pkg.price}
                </TableCell>
                <TableCell className="text-center space-x-2 space-x-reverse">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-blue-600 hover:bg-blue-50 rounded-lg"
                    onClick={() => handleOpenModal(pkg)}
                  >
                    <Pencil size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
