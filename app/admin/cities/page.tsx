"use client";

import { useState } from "react";
import { CityResponse } from "@/types/ad";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter 
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, MapPin, Search } from "lucide-react";
import { Label } from "@/components/ui/label";

// داتا وهمية للبدء
const initialCities: CityResponse[] = [
  { id: 1, arabicName: "دمشق", englishName: "Damascus" },
  { id: 2, arabicName: "حلب", englishName: "Aleppo" },
  { id: 3, arabicName: "حمص", englishName: "Homs" },
];

export default function CitiesManagementPage() {
  const [cities, setCities] = useState<CityResponse[]>(initialCities);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<CityResponse | null>(null);

  // تصفية المدن حسب البحث
  const filteredCities = cities.filter(city => 
    city.arabicName.includes(searchTerm) || city.englishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (city?: CityResponse) => {
    setEditingCity(city || null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900">إدارة المدن</h1>
          <p className="text-slate-500 font-bold mt-1">إضافة وتعديل المدن المتاحة في النظام</p>
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
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
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
              <TableHead className="w-20 text-right font-black p-5">ID</TableHead>
              <TableHead className="text-right font-black">الاسم بالعربية</TableHead>
              <TableHead className="text-right font-black">الاسم بالإنجليزية</TableHead>
              <TableHead className="text-center font-black">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCities.map((city) => (
              <TableRow key={city.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-bold p-5 text-slate-400">#{city.id}</TableCell>
                <TableCell className="font-bold text-slate-800">{city.arabicName}</TableCell>
                <TableCell className="text-slate-500 font-medium">{city.englishName}</TableCell>
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
      />
    </div>
  );
}

// 2. مكون المودال (CityModal)
function CityModal({ isOpen, onClose, city }: { isOpen: boolean, onClose: () => void, city: CityResponse | null }) {
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
              defaultValue={city?.arabicName} 
              className="h-12 rounded-xl border-slate-200 focus:ring-blue-500" 
              placeholder="مثال: دمشق"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-slate-700">الاسم بالإنجليزية</Label>
            <Input 
              defaultValue={city?.englishName} 
              className="h-12 rounded-xl border-slate-200 focus:ring-blue-500" 
              placeholder="Example: Damascus"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button 
            className="w-full h-12 rounded-xl bg-blue-600 font-bold text-lg"
            onClick={onClose}
          >
            {city ? "حفظ التعديلات" : "إضافة المدينة"}
          </Button>
          <Button 
            variant="ghost" 
            className="w-full h-12 rounded-xl font-bold" 
            onClick={onClose}
          >
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}