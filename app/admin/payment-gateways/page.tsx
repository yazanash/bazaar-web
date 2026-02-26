"use client";

import { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // لتبديل حالة البوابة (تفعيل/تعطيل)
import { 
  Plus, Pencil, Trash2, CreditCard, Landmark, 
  Smartphone, Info, Power, PowerOff 
} from "lucide-react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PaymentGatewaysPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const gateways = [
    { id: 1, name: "سيريتل كاش", type: "Wallet", account: "0991234567", active: true },
    { id: 2, name: "شركة الهرم", type: "Transfer", account: "دمشق - فرع الحلبوني", active: true },
    { id: 3, name: "بنك بيمو", type: "Bank", account: "011-223344-001", active: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900">بوابات الدفع</h1>
          <p className="text-slate-500 font-bold mt-1">إدارة طرق الدفع المتاحة للمستخدمين</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="rounded-xl h-12 bg-blue-600 font-bold shadow-lg shadow-blue-100"
        >
          <Plus className="ml-2" /> إضافة بوابة جديدة
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-none">
                <TableHead className="p-5 text-right font-black">البوابة</TableHead>
                <TableHead className="text-right font-black">نوع الوسيلة</TableHead>
                <TableHead className="text-right font-black">رقم الحساب / العنوان</TableHead>
                <TableHead className="text-center font-black">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gateways.map((gw) => (
                <TableRow key={gw.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <TableCell className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-slate-50 rounded-xl text-blue-600">
                        {gw.type === "Bank" ? <Landmark size={20} /> : gw.type === "Wallet" ? <Smartphone size={20} /> : <CreditCard size={20} />}
                      </div>
                      <span className="font-black text-slate-800">{gw.name}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase">
                      {gw.type}
                    </span>
                  </TableCell>

                  <TableCell className="font-bold text-slate-600 tracking-tight">
                    {gw.account}
                  </TableCell>

                  

                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50 rounded-xl">
                        <Pencil size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-400 hover:bg-red-50 rounded-xl">
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* مودال الإضافة */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-125 rounded-[2rem]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-right">إضافة بوابة دفع</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="space-y-2 text-right">
              <Label className="font-bold">اسم البوابة (يظهر للمستخدم)</Label>
              <Input placeholder="مثلاً: سيريتل كاش، الهرم..." className="rounded-xl h-12" />
            </div>

            <div className="space-y-2 text-right">
              <Label className="font-bold">رقم الحساب أو تفاصيل التحويل</Label>
              <Input placeholder="أدخل رقم المحفظة أو عنوان الفرع" className="rounded-xl h-12" />
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3 items-start">
              <Info className="text-amber-600 mt-1" size={20} />
              <p className="text-xs text-amber-800 leading-relaxed font-bold">
                ملاحظة: تأكد من تفعيل البوابة بعد إضافتها ليتمكن المستخدمون من رؤيتها في صفحة ترقية الحساب.
              </p>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button className="w-full bg-blue-600 h-12 rounded-xl font-bold text-lg">حفظ البوابة</Button>
            <Button variant="ghost" className="w-full h-12 rounded-xl font-bold" onClick={() => setIsModalOpen(false)}>إلغاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}