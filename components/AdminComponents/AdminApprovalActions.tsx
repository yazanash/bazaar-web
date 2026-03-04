"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Loader2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PubStatus } from "@/types/enums";
import { changeAdStatus } from "@/lib/actions/admin";

export default function AdminApprovalActions({ adId }: { adId: number }) {
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdateStatus = async (status: PubStatus) => {
    // إذا كان رفض ولم يتم كتابة سبب
    if (status === PubStatus.Rejected && !reason.trim()) {
      toast.error("يرجى كتابة سبب الرفض أولاً");
      return;
    }

    setLoading(true);
    try {
      const response = await changeAdStatus(adId,status, reason);
      if (response.success) {
        toast.success(
          status === PubStatus.Accepted
            ? "تم قبول الإعلان بنجاح"
            : "تم رفض الإعلان",
        );

        router.refresh();
        router.back();
      } else {
        toast.error(`فشل في تنفيذ الاجراء ${response.status}`);
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث حالة الإعلان");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 w-full md:w-auto">
      {showRejectBox && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-130 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-black text-slate-900 mb-2">
              رفض الإعلان
            </h2>
            <p className="text-sm text-slate-500 mb-6 font-bold">
              يرجى توضيح السبب للمستخدم لتحسين إعلانه مستقبلاً.
            </p>

            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="مثلاً: الصور غير واضحة..."
              className="rounded-3xl h-32 border-slate-100 bg-slate-50 focus:bg-white p-5 font-bold resize-none"
            />

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => handleUpdateStatus(PubStatus.Rejected)}
                disabled={loading || !reason.trim()}
                className="flex-1 h-14 rounded-2xl bg-red-600 hover:bg-red-700 font-black"
              >
                تأكيد الرفض
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowRejectBox(false)}
                className="flex-1 h-14 rounded-2xl font-bold"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}

      <Button
        disabled={loading}
        onClick={() => handleUpdateStatus(PubStatus.Accepted)}
        className="h-12 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black shadow-lg shadow-emerald-100"
      >
        قبول ونشر الإعلان
      </Button>

      <Button
        disabled={loading}
        variant="outline"
        onClick={() => setShowRejectBox(true)}
        className="h-12 px-6 rounded-xl border-red-100 text-red-500 hover:bg-red-50 font-black"
      >
        رفض الإعلان
      </Button>
    </div>
  );
}
