"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, AlertCircle } from "lucide-react";

export default function AdminApprovalActions({ adId }: { adId: number }) {
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [reason, setReason] = useState("");

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:right-72 bg-white/80 backdrop-blur-lg border-t border-slate-200 p-4 z-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        
        {showRejectBox && (
          <div className="animate-in slide-in-from-bottom-2 duration-300">
            <p className="text-xs font-black text-red-500 mb-2 mr-2">سبب الرفض (سيصل للمستخدم):</p>
            <Textarea 
              placeholder="مثلاً: الصور غير واضحة، السعر مبالغ فيه..." 
              className="rounded-xl border-red-100 bg-red-50/30 focus:bg-white transition-all"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        )}

        <div className="flex gap-3">
          {!showRejectBox ? (
            <>
              <Button 
                className="flex-1 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-black text-lg shadow-lg shadow-emerald-100"
                onClick={() => alert("تم القبول")}
              >
                <Check className="ml-2" /> قبول المنشور
              </Button>
              <Button 
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
                className="flex-2 h-14 rounded-2xl bg-red-600 hover:bg-red-700 font-black text-lg shadow-lg shadow-red-100"
                disabled={!reason}
              >
                تأكيد الرفض النهائي
              </Button>
              <Button 
                variant="ghost" 
                className="flex-1 h-14 rounded-2xl font-bold"
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