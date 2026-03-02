"use client";

import { useState } from "react";
import { CityResponse } from "@/types/ad";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, MapPin, Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import React from "react";
import { createCity, updateCity } from "@/lib/actions/admin";
interface CitiesProps {
  initialCities: CityResponse[] | [];
}
export default function CitiesManagement({ initialCities }: CitiesProps) {
  const [cities, setCities] = useState<CityResponse[]>(initialCities);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<CityResponse | null>(null);

  // تصفية المدن حسب البحث
  const filteredCities = cities.filter(
    (city) =>
      city.arabicName.includes(searchTerm) ||
      city.englishName.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const onCityCreated = (newCity: CityResponse) => {
    setCities((prev) => [newCity, ...prev]);
  };

  // دالة لتحديث مدينة موجودة في القائمة
  const onCityUpdated = (updatedCity: CityResponse) => {
    setCities((prev) =>
      prev.map((c) => (c.id === updatedCity.id ? updatedCity : c)),
    );
  };
  const handleOpenModal = (city?: CityResponse) => {
    setEditingCity(city || null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900">إدارة المدن</h1>
          <p className="text-slate-500 font-bold mt-1">
            إضافة وتعديل المدن المتاحة في النظام
          </p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="rounded-2xl h-12 px-6 bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-100"
        >
          <Plus className="ml-2" size={20} />
          إضافة مدينة جديدة
        </Button>
      </div>

      {/* Bar البحث */}
      <div className="relative max-w-md">
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <Input
          placeholder="ابحث عن مدينة..."
          className="pr-10 h-12 rounded-xl border-slate-200 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* الجدول */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="w-20 text-right font-black p-5">
                ID
              </TableHead>
              <TableHead className="text-right font-black">
                الاسم بالعربية
              </TableHead>
              <TableHead className="text-right font-black">
                الاسم بالإنجليزية
              </TableHead>
              <TableHead className="text-center font-black">
                الإجراءات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCities.map((city) => (
              <TableRow
                key={city.id}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                <TableCell className="font-bold p-5 text-slate-400">
                  #{city.id}
                </TableCell>
                <TableCell className="font-bold text-slate-800">
                  {city.arabicName}
                </TableCell>
                <TableCell className="text-slate-500 font-medium">
                  {city.englishName}
                </TableCell>
                <TableCell className="text-center space-x-2 space-x-reverse">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl text-blue-600 hover:bg-blue-50"
                    onClick={() => handleOpenModal(city)}
                  >
                    <Pencil size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl text-red-500 hover:bg-red-50"
                    onClick={() => alert(`حذف ${city.arabicName}`)}
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
      <CityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        city={editingCity}
        onCreated={onCityCreated}
        onUpdated={onCityUpdated}
      />
    </div>
  );
}

// 2. مكون المودال (CityModal)
function CityModal({
  isOpen,
  onClose,
  city,
  onCreated,
  onUpdated,
}: {
  isOpen: boolean;
  onClose: () => void;
  city: CityResponse | null;
  onCreated: (newCity: CityResponse) => void;
  onUpdated: (updatedCity: CityResponse) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CityResponse>({
    id: 0,
    arabicName: "",
    englishName: "",
  });

  React.useEffect(() => {
    if (city) {
      setFormData(city);
    } else {
      setFormData({ id: 0, arabicName: "", englishName: "" });
    }
  }, [city, isOpen]);
  const handleSubmit = async () => {
    if (!formData.arabicName || !formData.englishName) {
      alert("يرجى تعبئة كافة الحقول");
      return;
    }
    setLoading(true);
    try {
      if (city) {
        // نداء API التعديل
        const res = await updateCity(formData);
        if (res.success && res.data) {
          onUpdated(res.data);
          onClose();
        } else {
          alert(`حدث خطا اثناء الحفظ ${res.message}`);
        }
      } else {
        const res = await createCity(formData);
        if (res.success && res.data) {
          onCreated(res.data);
          onClose();
        } else {
          alert(`حدث خطا اثناء الحفظ ${res.message}`);
        }
      }
      onClose();
    } catch (error) {
      console.error("خطأ في العملية", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-106.25 rounded-[2rem] p-8" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-800 text-right">
            {city ? "تعديل مدينة" : "إضافة مدينة جديدة"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-6">
          <div className="space-y-2">
            <Label className="font-bold text-slate-700">الاسم بالعربية</Label>
            <Input
             value={formData.arabicName}
              className="h-12 rounded-xl border-slate-200 focus:ring-blue-500"
              placeholder="مثال: دمشق"
              onChange={(e) =>
                setFormData({ ...formData, arabicName: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-slate-700">
              الاسم بالإنجليزية
            </Label>
            <Input
              value={formData.englishName}
              onChange={(e) =>
                setFormData({ ...formData, englishName: e.target.value })
              }
              className="h-12 rounded-xl border-slate-200 focus:ring-blue-500"
              placeholder="Example: Damascus"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row-reverse gap-3 mt-4">
  <Button
    disabled={loading}
    className="w-full h-12 rounded-xl bg-blue-600 font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-100"
    onClick={handleSubmit}
  >
    {loading
      ? "جاري المعالجة..."
      : city
        ? "حفظ التعديلات"
        : "إضافة المدينة"}
  </Button>
  
  <Button
    variant="ghost"
    className="w-full h-12 rounded-xl font-bold text-slate-500 hover:bg-slate-50"
    onClick={onClose}
  >
    إلغاء
  </Button>
</div>
      </DialogContent>
    </Dialog>
  );
}
