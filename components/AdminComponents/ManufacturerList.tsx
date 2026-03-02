"use client";
import {
  ChevronLeft,
  Factory,
  MoreVertical,
  Pencil,
  Plus,
  Search,
} from "lucide-react";
import { ManufacturerModal } from "./ManufacturerModel";
import { Button } from "../ui/button";
import { ManufacturerResponse } from "@/types/ad";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

interface ManufacturersListProps {
  manufacturers: ManufacturerResponse[];
}

export default function ManufacturersList({
  manufacturers: initialManufacturers,
}: ManufacturersListProps) {
  const router = useRouter();
  const [manufacturers, setManufacturers] = useState(initialManufacturers);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingManufacturer, setEditingManufacturer] =
    useState<ManufacturerResponse | null>(null);

  // الفلترة
  const filtered = manufacturers.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleOpenModal = (m?: ManufacturerResponse) => {
    setEditingManufacturer(m || null);
    console.log(m);
    setIsModalOpen(true);
  };

  const onCreated = (newM: ManufacturerResponse) =>
    setManufacturers([newM, ...manufacturers]);
  const onUpdated = (updatedM: ManufacturerResponse) =>
    setManufacturers(
      manufacturers.map((m) => (m.id === updatedM.id ? updatedM : m)),
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-slate-900">المصانع</h1>
        <Button
          onClick={() => handleOpenModal()}
          className="rounded-2xl h-12 bg-blue-600 font-bold shadow-lg shadow-blue-100"
        >
          <Plus className="ml-2" /> إضافة مصنع جديد
        </Button>
      </div>

      <div className="relative">
        <Search
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />

        <Input
          placeholder="ابحث عن مصنع (مثلاً: تويوتا، نيسان...)"
          className="h-14 pr-12 rounded-2xl bg-white border-none shadow-sm text-lg font-bold"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((m) => (
          <div
            key={m.id}
            onClick={() => router.push(`/admin/manufacturers/${m.id}`)}
            className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Factory size={28} />
              </div>

              <Button
                variant="ghost"
                size="icon"
                // أضفنا z-50 لضمان الظهور فوق كل طبقات الكرت
                className="absolute left-4 top-4 z-50 rounded-full text-slate-400 hover:text-blue-600 hover:bg-slate-100"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleOpenModal(m);
                }}
              >
                <Pencil size={20} />
              </Button>
            </div>

            <h3 className="text-xl font-black text-slate-800 mb-1">{m.name}</h3>

            <div className="mt-6 flex items-center text-blue-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              عرض الموديلات وإدارتها <ChevronLeft size={16} className="mr-1" />
            </div>
          </div>
        ))}
      </div>

      <ManufacturerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        manufacturer={editingManufacturer}
        onCreated={onCreated}
        onUpdated={onUpdated}
      />
    </div>
  );
}
