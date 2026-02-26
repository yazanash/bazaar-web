"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Factory, ChevronLeft, MoreVertical } from "lucide-react";

export default function ManufacturersPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // داتا وهمية
  const manufacturers = [
    { id: 1, name: "تويوتا", modelsCount: 45 },
    { id: 2, name: "مرسيدس", modelsCount: 32 },
    { id: 3, name: "بي ام دبليو", modelsCount: 28 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-slate-900">المصانع</h1>
        <Button className="rounded-2xl h-12 bg-blue-600 font-bold shadow-lg shadow-blue-100">
          <Plus className="ml-2" /> إضافة مصنع جديد
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <Input 
          placeholder="ابحث عن مصنع (مثلاً: تويوتا، نيسان...)" 
          className="h-14 pr-12 rounded-2xl bg-white border-none shadow-sm text-lg font-bold"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {manufacturers.map((m) => (
          <div 
            key={m.id}
            onClick={() => router.push(`/admin/manufacturers/${m.id}`)}
            className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Factory size={28} />
              </div>
              <Button variant="ghost" size="icon" className="rounded-full text-slate-300">
                <MoreVertical size={20} />
              </Button>
            </div>
            
            <h3 className="text-xl font-black text-slate-800 mb-1">{m.name}</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              {m.modelsCount} موديل مسجل
            </p>

            <div className="mt-6 flex items-center text-blue-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              عرض الموديلات وإدارتها <ChevronLeft size={16} className="mr-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}