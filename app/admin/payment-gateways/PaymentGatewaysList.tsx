"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // لتبديل حالة البوابة (تفعيل/تعطيل)
import {
  Plus,
  Pencil,
  Trash2,
  CreditCard,
  Landmark,
  Smartphone,
  Info,
  Power,
  PowerOff,
  Hash,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaymentGateway } from "@/types/admin";
import { Textarea } from "@/components/ui/textarea";
import {
  createPaymentGateways,
  updatePaymentGateways,
} from "@/lib/actions/admin";
import { cn } from "@/lib/utils";

interface PaymentGatewaysProps {
  gateways: PaymentGateway[];
}

export default function PaymentGatewaysList({
  gateways,
}: PaymentGatewaysProps) {
  const [allGateways, setAllGateways] = useState(gateways);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGateway, setEditingGateway] = useState<PaymentGateway | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<PaymentGateway>({
    id: 0,
    name: "",
    accountNumber: "",
    instructions: "",
    isActive: true,
  });
  const handleOpenModal = (gw?: PaymentGateway) => {
    setEditingGateway(gw || null);
    setFormData(
      gw
        ? gw
        : {
            id: 0,
            name: "",
            accountNumber: "",
            instructions: "",
            isActive: true,
          },
    );
    setIsModalOpen(true);
  };
  const onCreated = (newModel: PaymentGateway) =>
    setAllGateways((prev) => [newModel, ...prev]);
  const onUpdated = (updatedModel: PaymentGateway) =>
    setAllGateways((prev) =>
      prev.map((m) => (m.id === updatedModel.id ? updatedModel : m)),
    );
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (editingGateway) {
        const res = await updatePaymentGateways(formData);
        if (res.success && res.data) onUpdated(res.data);
      } else {
        const res = await createPaymentGateways(formData);
        if (res.success && res.data) onCreated(res.data);
      }

      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900">بوابات الدفع</h1>
          <p className="text-slate-500 font-bold mt-1">
            إدارة طرق الدفع المتاحة للمستخدمين
          </p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="rounded-xl h-12 bg-blue-600 font-bold shadow-lg shadow-blue-100"
        >
          <Plus className="ml-2" /> إضافة بوابة جديدة
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-3">
          {allGateways.map((gw) => (
            <div
              key={gw.id}
              className="group bg-white p-4 rounded-[1.8rem] border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              {/* 1. قسم المعلومات الأساسية والحالة */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-sm",
                    gw.isActive
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      : "bg-slate-50 text-slate-400 border border-slate-100",
                  )}
                >
                  {gw.isActive ? <Power size={22} /> : <PowerOff size={22} />}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-800 text-base">
                      {gw.name}
                    </span>
                    {gw.isActive ? (
                      <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    ) : null}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {gw.isActive ? "نشط حالياً" : "متوقف"}
                  </span>
                </div>
              </div>

              {/* 2. رقم الحساب / العنوان - بشكل "Badge" أنيق */}
              <div className="flex-1 flex justify-start md:justify-center w-full md:w-auto px-2">
                <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2 group-hover:bg-white group-hover:border-blue-100 transition-all w-full md:w-auto">
                  <Hash size={14} className="text-slate-400" />
                  <span className="text-xs font-bold text-slate-600 font-mono tracking-wider">
                    {gw.accountNumber}
                  </span>
                </div>
              </div>

              {/* 3. أزرار التحكم */}
              <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-50">
                <Button
                  onClick={() => handleOpenModal(gw)}
                  variant="outline"
                  className="flex-1 md:flex-none h-11 md:w-28 rounded-xl border-slate-100 text-blue-600 font-bold text-xs hover:bg-blue-600 hover:text-white transition-all"
                >
                  <Pencil size={14} className="ml-2" />
                  تعديل
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* مودال الإضافة */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-125 rounded-[2rem]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-right">
              {editingGateway ? "تعديل بوابة الدفع" : "إضافة بوابة دفع جديدة"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="space-y-2 text-right">
              <Label className="font-bold">اسم البوابة (يظهر للمستخدم)</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="مثلاً: سيريتل كاش، الهرم..."
                className="rounded-xl h-12"
              />
            </div>

            <div className="space-y-2 text-right">
              <Label className="font-bold">رقم الحساب </Label>
              <Input
                placeholder="أدخل رقم المحفظة أو عنوان الفرع"
                className="rounded-xl h-12"
                value={formData.accountNumber}
                onChange={(e) =>
                  setFormData({ ...formData, accountNumber: e.target.value })
                }
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="space-y-0.5">
                <Label className="font-bold text-slate-800">حالة البوابة</Label>
                <p className="text-xs text-slate-500 font-bold">
                  {formData.isActive
                    ? "البوابة ستظهر للمستخدمين حالاً"
                    : "البوابة ستكون مخفية عن المستخدمين"}
                </p>
              </div>
              <div dir="ltr">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
              </div>
            </div>
            <div className="space-y-2 text-right">
              <Label className="font-bold">تعليمات التحويل </Label>
              <Textarea
                placeholder="ادخل تعليمات التحويل"
                className="rounded-xl h-12"
                value={formData.instructions}
                onChange={(e) =>
                  setFormData({ ...formData, instructions: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row-reverse gap-3">
            <Button
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-blue-600 h-12 rounded-xl font-bold text-lg"
            >
              {loading ? "جاري الحفظ..." : "حفظ البيانات"}
            </Button>
            <Button
              variant="ghost"
              className="w-full h-12 rounded-xl font-bold"
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
