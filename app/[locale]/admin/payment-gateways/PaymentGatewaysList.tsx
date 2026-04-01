"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Power, PowerOff, Hash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { useLocale, useTranslations } from "next-intl";

interface PaymentGatewaysProps {
  gateways: PaymentGateway[];
}

export default function PaymentGatewaysList({
  gateways,
}: PaymentGatewaysProps) {
  const t = useTranslations("admin.paymentsGateway");
  const locale = useLocale();
  const isArabic = locale === "ar";
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
          <h1 className="text-3xl font-black text-slate-900">{t("title")}</h1>
          <p className="text-slate-500 font-bold mt-1">{t("description")}</p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="rounded-xl h-12 bg-blue-600 font-bold shadow-lg shadow-blue-100"
        >
          <Plus className="ml-2" /> {t("addNew")}
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
                    {gw.isActive ? t("inactive") : t("active")}
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
              {editingGateway ? t("edit") : t("addNew")}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="space-y-2 text-right">
              <Label className="font-bold">{t("name")}</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder={t("namePlaceholder")}
                className="rounded-xl h-12"
              />
            </div>

            <div className="space-y-2 text-right">
              <Label className="font-bold">{t("accountInfo")} </Label>
              <Input
                placeholder={t("accountInfoPlaceholder")}
                className="rounded-xl h-12"
                value={formData.accountNumber}
                onChange={(e) =>
                  setFormData({ ...formData, accountNumber: e.target.value })
                }
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="space-y-0.5">
                <Label className="font-bold text-slate-800">
                  {t("status")}{" "}
                </Label>
                <p className="text-xs text-slate-500 font-bold">
                  {formData.isActive ? t("active") : t("inactive")}
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
              <Label className="font-bold">{t("instractions")}</Label>
              <Textarea
                placeholder={t("instractionsPlaceholder")}
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
              {loading ? t("saving") : t("save")}
            </Button>
            <Button
              variant="ghost"
              className="w-full h-12 rounded-xl font-bold"
              onClick={() => setIsModalOpen(false)}
            >
              {t("cancel")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
