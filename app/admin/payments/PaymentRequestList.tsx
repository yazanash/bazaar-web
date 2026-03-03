"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  CheckCircle,
  XCircle,
  ExternalLink,
  User,
  Mail,
  Phone,
  CreditCard,
  Package,
} from "lucide-react";
import { PaymentRequest } from "@/types/admin";
import { getImageUrl } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { changePaymentRequest } from "@/lib/actions/admin";
interface PaymentRequestProps {
  initialRequests: PaymentRequest[];
}

export default function PaymentRequestsList({
  initialRequests,
}: PaymentRequestProps) {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(
    null,
  );
  const [rejectReason, setRejectReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // دالة لفتح المودال بالطلب كاملًا وليس فقط الصورة
  const handleViewRequest = (req: PaymentRequest) => {
    setSelectedRequest(req);
    setRejectReason(""); // تصفير السبب عند فتح طلب جديد
  };
  const handleAction = async (type: "accepted" | "rejected") => {
    if (!selectedRequest) return;

    setIsSubmitting(true);
    try {
      // نداء الـ Action
      const res = await changePaymentRequest(
        selectedRequest.id,
        type,
        rejectReason,
      );

      if (res.success) {
        // تحديث الحالة المحلية لحذف الطلب من القائمة أو تحديث الـ Badge
        setRequests((prev) => prev.filter((r) => r.id !== selectedRequest.id));
        setSelectedRequest(null);
        alert(
          type === "accepted"
            ? "تم تفعيل الاشتراك بنجاح"
            : "تم رفض الطلب وإبلاغ المستخدم",
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">
          طلبات الدفع والاشتراكات
        </h1>
        <p className="text-slate-500 font-bold mt-1">
          راجع وصولات الدفع وفعل باقات المستخدمين
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1">
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <Input
            placeholder="ابحث باسم المستخدم، الإيميل، أو رقم الطلب..."
            className="pr-10 h-12 rounded-xl border-slate-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col gap-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="group bg-white p-5 rounded-[2rem] border border-slate-100 hover:border-blue-200 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            {/* 1. قسم المستخدم والمعرف */}
            <div className="flex flex-col gap-2 min-w-50">
              <div className="flex items-center gap-2">
                <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-0.5 rounded-lg">
                  ID: {req.id}
                </span>
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                  Payment Request
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Mail size={14} />
                </div>
                <span className="text-sm truncate">{req.userEmail}</span>
              </div>
            </div>

            {/* 2. تفاصيل الباقة والمبلغ - تمييز بصري للمبلغ */}
            <div className="flex flex-row md:flex-col items-center md:items-start justify-between md:justify-center gap-2 px-4 py-2 md:py-0 border-y md:border-y-0 md:border-r border-slate-50">
              <Badge
                variant="outline"
                className="w-fit bg-amber-50 text-amber-700 border-amber-100 font-black text-[10px] px-3 py-1 rounded-full"
              >
                <Package size={12} className="ml-1" /> {req.packageName}
              </Badge>
              <div className="text-xl font-black text-slate-900">
                {req.packagePrice}{" "}
                <span className="text-sm text-slate-400 font-bold">$</span>
              </div>
            </div>

            {/* 3. بوابة الدفع */}
            <div className="flex items-center gap-3 md:w-40">
              <div className="p-2 rounded-xl bg-slate-50 text-slate-400">
                <CreditCard size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase">
                  Payment via
                </span>
                <span className="text-xs font-black text-slate-700">
                  {req.paymentGatewayName}
                </span>
              </div>
            </div>

            {/* 4. الإجراءات - زر "الوصل" بشكل بارز */}
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <Button
                onClick={() => handleViewRequest(req)}
                className="flex-1 md:flex-none h-12 md:px-8 rounded-2xl bg-blue-600 hover:bg-slate-900 text-white font-black text-sm shadow-lg shadow-blue-100 transition-all active:scale-95"
              >
                <ExternalLink size={16} className="ml-2" />
                عرض الوصل
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Sheet
        open={!!selectedRequest}
        onOpenChange={() => setSelectedRequest(null)}
      >
        <SheetContent
          side="left"
          className="w-full sm:max-w-xl p-0 flex flex-col h-full border-none shadow-2xl"
          dir="rtl"
        >
          <SheetHeader className="p-6 bg-white border-b sticky top-0 z-10 shadow-sm">
            <SheetTitle className="text-2xl font-black text-slate-900 text-right flex items-center gap-2">
              <CreditCard className="text-blue-600" size={24} />
              مراجعة طلب الدفع
            </SheetTitle>
          </SheetHeader>

          {/* هنا السكرول حقيقي ومنطقي لأنه بياخد طول الشاشة */}
          <div className="flex-1 overflow-y-auto bg-slate-50 p-6 space-y-8 custom-scrollbar">
            {/* قسم المعلومات */}
            <div className="space-y-4">
              <h3 className="font-black text-slate-800 text-lg">
                بيانات المشترك
              </h3>
              <div className="grid gap-3">
                <div className="flex justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <span className="text-slate-400 font-bold">الإيميل</span>
                  <span className="text-slate-900 font-black">
                    {selectedRequest?.userEmail}
                  </span>
                </div>
                <div className="flex justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <span className="text-slate-400 font-bold">
                    الباقة والمبلغ
                  </span>
                  <span className="text-emerald-600 font-black">
                    {selectedRequest?.packageName} -{" "}
                    {selectedRequest?.packagePrice} $
                  </span>
                </div>
              </div>
            </div>

            {/* قسم الصورة - بدون تحديد ارتفاع قاسي لترك السكرول الطبيعي */}
            <div className="space-y-4">
              <h3 className="font-black text-slate-800 text-lg">
                وصل الدفع المرفق
              </h3>
              <div className="bg-white p-2 rounded-3xl border-2 border-slate-100 shadow-inner">
                {selectedRequest && (
                  <img
                    src={getImageUrl(selectedRequest.receiptImagePath)}
                    alt="Receipt"
                    className="w-full h-auto rounded-2xl object-contain shadow-sm"
                  />
                )}
              </div>
            </div>

            {/* قسم القرار */}
            <div className="space-y-4 pb-10">
              <h3 className="font-black text-slate-800 text-lg">
                اتخاذ الإجراء
              </h3>
              <textarea
                className="w-full h-32 p-4 rounded-2xl border-2 border-slate-100 focus:border-red-200 focus:ring-4 focus:ring-red-50 outline-none transition-all font-bold"
                placeholder="اكتب ملاحظات الرفض هنا..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
          </div>

          {/* الأزرار ثابتة تحت دائماً */}
          <div className="p-6 bg-white border-t grid grid-cols-2 gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
            <Button
              disabled={isSubmitting}
              onClick={() => handleAction("accepted")}
              className="h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-black text-lg"
            >
              قبول وتفعيل
            </Button>
            <Button
              disabled={isSubmitting || !rejectReason}
              onClick={() => handleAction("rejected")}
              variant="destructive"
              className="h-14 rounded-2xl font-black text-lg"
            >
              رفض الطلب
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
