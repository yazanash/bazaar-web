"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, Pencil, Trash2, CarFront } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ManufacturerModelsPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="space-y-8">
      {/* Back Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push("/admin/manufacturers")}>
          <ArrowRight size={24} />
        </Button>
        <div>
          <h1 className="text-3xl font-black text-slate-900">موديلات تويوتا</h1>
          <p className="text-slate-500 font-bold">إدارة جميع الموديلات التابعة لهذه الماركة</p>
        </div>
        <Button className="mr-auto rounded-2xl h-12 bg-blue-600 font-bold">
          <Plus className="ml-2" /> إضافة موديل لهذا المصنع
        </Button>
      </div>

      {/* Models Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-none">
              <TableHead className="p-6 text-right font-black">اسم الموديل</TableHead>
              <TableHead className="text-right font-black">الفئة (Category)</TableHead>
              <TableHead className="text-center font-black">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50">
                <TableCell className="p-6 font-bold text-slate-800 text-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-400">
                      <CarFront size={18} />
                    </div>
                    Camry 2024
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="bg-blue-50 text-blue-600 border-none px-4 py-1 rounded-lg font-bold">
                    سياحية (Passenger)
                  </Badge>
                </TableCell>
                <TableCell className="text-center space-x-2 space-x-reverse">
                  <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50 rounded-xl"><Pencil size={18} /></Button>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 rounded-xl"><Trash2 size={18} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
