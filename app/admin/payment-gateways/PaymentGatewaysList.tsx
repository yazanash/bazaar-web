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
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-none">
                <TableHead className="p-5 text-right font-black">
                  البوابة
                </TableHead>
                <TableHead className="text-right font-black">
                  رقم الحساب / العنوان
                </TableHead>
                <TableHead className="text-center font-black">
                  الإجراءات
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allGateways.map((gw) => (
                <TableRow
                  key={gw.id}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  <TableCell className="p-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${gw.isActive ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"}`}
                      >
                        {gw.isActive ? (
                          <Power size={18} />
                        ) : (
                          <PowerOff size={18} />
                        )}
                      </div>
                      <span className="font-black text-slate-800">
                        {gw.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase">
                      {gw.accountNumber}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-600 hover:bg-blue-50 rounded-xl"
                        onClick={() => handleOpenModal(gw)}
                      >
                        <Pencil size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:bg-red-50 rounded-xl"
                      >
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
