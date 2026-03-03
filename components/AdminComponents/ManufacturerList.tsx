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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((m) => (
          <div
            key={m.id}
            onClick={() => router.push(`/admin/manufacturers/${m.id}`)}
            className="group relative bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
          >
            <div className="absolute top-6 right-6 left-6 flex justify-between items-center z-10">
              <span className="text-[10px] font-black text-slate-300 group-hover:text-blue-200 transition-colors uppercase tracking-[0.2em]">
                ID #{m.id}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-lg transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleOpenModal(m);
                }}
              >
                <Pencil size={16} />
              </Button>
            </div>

            <div className="pt-16 pb-8 px-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-6 relative">
                <div className="absolute inset-0 bg-blue-600/5 rounded-[2rem] rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                <div className="absolute inset-0 bg-white border border-slate-100 rounded-[2rem] flex items-center justify-center text-slate-700 group-hover:text-blue-600 group-hover:border-blue-100 transition-all duration-500 shadow-sm">
                  <Factory size={32} strokeWidth={1.5} />
                </div>
              </div>

              <h3 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                {m.name}
              </h3>

              <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-widest">
                Car Manufacturer
              </p>
            </div>

            <div className="px-8 py-5 bg-slate-50/50 group-hover:bg-blue-600 transition-colors duration-500 flex items-center justify-between mt-auto">
              <span className="text-xs font-black text-slate-500 group-hover:text-white/90 transition-colors">
                إدارة الموديلات
              </span>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-all">
                <ChevronLeft size={16} />
              </div>
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
