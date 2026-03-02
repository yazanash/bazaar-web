"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ManufacturerDataService } from "@/lib/services/manufacturerDataService";
import { useEffect, useState } from "react";
import { ManufacturerResponse } from "@/types/ad";
import { createManufacturers, updateManufacturers } from "@/lib/actions/admin";

export function ManufacturerModal({
  isOpen,
  onClose,
  manufacturer,
  onCreated,
  onUpdated,
}: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ManufacturerResponse>({
    id: 0,
    name: "",
    supportedCategories: [],
  });

  useEffect(() => {
    if (manufacturer) setFormData(manufacturer);
    else setFormData({ id: 0, name: "", supportedCategories: [] });
  }, [manufacturer, isOpen]);

  const handleSubmit = async () => {
    if (!formData.name) return;
    setLoading(true);
    try {
      if (manufacturer) {
        const res = await updateManufacturers(formData);
        if (res.success) onUpdated(res.data);
      } else {
        const res = await createManufacturers(formData);
        if (res.success) onCreated(res.data);
      }
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-100 rounded-[2rem] p-8" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-800 text-right">
            {manufacturer ? "تعديل مصنع" : "إضافة مصنع جديد"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <div className="space-y-2 text-right">
            <Label className="font-bold text-slate-700">اسم المصنع</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="h-12 rounded-xl border-slate-200"
              placeholder="مثال: Mercedes, Toyota..."
            />
          </div>
        </div>

        {/* حل مشكلة الزر اللي بيطلع برا المودال */}
        <div className="flex flex-col sm:flex-row-reverse gap-3">
          <Button
            disabled={loading}
            className="w-full h-12 rounded-xl bg-blue-600 font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-100"
            onClick={handleSubmit}
          >
            {loading ? "جاري الحفظ..." : manufacturer ? "تعديل" : "إضافة"}
          </Button>
          <Button
            variant="ghost"
            className="w-full h-12 rounded-xl font-bold text-slate-500"
            onClick={onClose}
          >
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
