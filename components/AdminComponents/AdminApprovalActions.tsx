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
      const response = await changeAdStatus(status, reason);
      if (response.success) {
        toast.success(
          status === PubStatus.Accepted
            ? "تم قبول الإعلان بنجاح"
            : "تم رفض الإعلان",
        );

        router.refresh();
        router.back();
      } else {
        toast.error("فشل في تنفذ الاجراء");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث حالة الإعلان");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:right-72 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4 z-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        {showRejectBox && (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-2 mr-2">
              <p className="text-xs font-black text-red-500">
                سبب الرفض (سيصل للمستخدم):
              </p>
              <button
                onClick={() => setReason("")}
                className="text-[10px] text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <RotateCcw size={10} /> مسح النص
              </button>
            </div>
            <Textarea
              placeholder="مثلاً: الصور غير واضحة، السعر مبالغ فيه..."
              className="rounded-2xl border-red-100 bg-red-50/30 focus:bg-white transition-all h-24 resize-none font-bold"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        )}

        <div className="flex gap-4">
          {!showRejectBox ? (
            <>
              <Button
                disabled={loading}
                className="flex-2 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-black text-lg shadow-lg shadow-emerald-100 transition-all active:scale-95"
                onClick={() => handleUpdateStatus(PubStatus.Accepted)}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Check className="ml-2" /> قبول المنشور
                  </>
                )}
              </Button>
              <Button
                disabled={loading}
                variant="outline"
                className="flex-1 h-14 rounded-2xl border-red-200 text-red-600 hover:bg-red-50 font-black text-lg"
                onClick={() => setShowRejectBox(true)}
              >
                <X className="ml-2" /> رفض
              </Button>
            </>
          ) : (
            <>
              <Button
                disabled={loading || !reason.trim()}
                className="flex-2 h-14 rounded-2xl bg-red-600 hover:bg-red-700 font-black text-lg shadow-lg shadow-red-100 transition-all active:scale-95"
                onClick={() => handleUpdateStatus(PubStatus.Rejected)}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "تأكيد الرفض النهائي"
                )}
              </Button>
              <Button
                disabled={loading}
                variant="ghost"
                className="flex-1 h-14 rounded-2xl font-bold text-slate-500"
                onClick={() => setShowRejectBox(false)}
              >
                تراجع
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
