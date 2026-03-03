"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, Pencil, Trash2, CarFront } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ModelResponse } from "@/types/admin";
import { useState } from "react";
import { ModelModal } from "./ModelModal";
interface ModelsListProps {
  models: ModelResponse[];
  manufacturerName: string;
  manufacturerId: number;
}
export default function ManufacturerModelsList({
  models,
  manufacturerName,
  manufacturerId,
}: ModelsListProps) {
  const [allModels, setAllModels] = useState(models);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<ModelResponse | null>(null);
  const onCreated = (newModel: ModelResponse) =>
    setAllModels((prev) => [newModel, ...prev]);
  const onUpdated = (updatedModel: ModelResponse) =>
    setAllModels((prev) =>
      prev.map((m) => (m.id === updatedModel.id ? updatedModel : m)),
    );
  const handleOpenModal = (model?: ModelResponse) => {
    setEditingModel(model || null);
    setIsModalOpen(true);
  };
  const router = useRouter();

  return (
    <div className="space-y-8">
      {/* Back Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full z-100"
          onClick={() => router.push("/admin/manufacturers")}
        >
          <ArrowRight size={24} />
        </Button>
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            {manufacturerName}
          </h1>
          <p className="text-slate-500 font-bold">
            إدارة جميع الموديلات التابعة لهذه الماركة
          </p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="mr-auto rounded-2xl h-12 bg-blue-600 font-bold"
        >
          <Plus className="ml-2" /> إضافة موديل لهذا المصنع
        </Button>
      </div>

      {/* Models Table */}
      <div className="flex flex-col gap-3">
        {allModels.map((model) => (
          <div
            key={model.id}
            className="group bg-white p-3 pr-5 rounded-[1.5rem] border border-slate-100 hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 flex items-center justify-between gap-4"
          >
            {/* 1. القسم الأيمن: الأيقونة والاسم */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                <CarFront size={22} strokeWidth={1.5} />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                  {model.name}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Model Details
                </span>
              </div>
            </div>

            {/* 2. القسم الأوسط: الفئة (Category) */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="bg-blue-50/50 text-blue-600 px-4 py-1.5 rounded-xl text-xs font-black border border-blue-100/50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {model.category}
              </div>
            </div>

            {/* 3. القسم الأيسر: الإجراءات */}
            <div className="flex items-center gap-2">
              {/* زر التعديل بشكل عصري */}
              <Button
                onClick={() => handleOpenModal(model)}
                variant="ghost"
                size="sm"
                className="h-10 px-4 rounded-xl text-blue-600 hover:bg-blue-50 font-bold text-xs flex items-center gap-2"
              >
                <Pencil size={14} />
                <span className="hidden sm:inline">تعديل</span>
              </Button>

              {/* زر حذف سريع (اختياري لو حابب تظهره) */}
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <ModelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        model={editingModel}
        manufacturerId={manufacturerId}
        onCreated={onCreated}
        onUpdated={onUpdated}
      />
    </div>
  );
}
