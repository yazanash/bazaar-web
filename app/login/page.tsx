"use client";

import { useState, useTransition } from "react";
import { requestOtpAction, loginAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Mail, Lock, Loader2, ArrowRight, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleRequestOtp = async () => {
    if (!email) return;
    setErrorMessage(null);

    startTransition(async () => {
      const result = await requestOtpAction(email);
      if (result.success) {
        setStep(2);
      } else {
        setErrorMessage(result.message);
      }
    });
  };

  const handleVerify = async () => {
    if (otp.length < 6) return;
    setErrorMessage(null);

    startTransition(async () => {
      const result = await loginAction(email, otp);
      if (!result.success) {
        setErrorMessage(result.message);
      }
    });
  };

  return (
    <div
      className="min-h-[85vh] flex items-center justify-center px-4 font-sans"
      dir="rtl"
    >
      <Card className="w-full max-w-md border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white rounded-[3rem] overflow-hidden">
        <CardHeader className="space-y-4 pt-10 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-200">
            <Lock className="text-white" size={28} />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-black text-slate-800">
              {step === 1 ? "تسجيل الدخول" : "تأكيد الرمز"}
            </CardTitle>
            <CardDescription className="text-slate-500 font-bold">
              {step === 1
                ? "أدخل بريدك الإلكتروني للمتابعة"
                : "أدخل الرمز المرسل إلى بريدك"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pb-10 space-y-6">
          {errorMessage && (
            <Alert
              variant="destructive"
              className="rounded-2xl bg-red-50 border-red-100 text-red-600 animate-in shake-1 duration-300"
            >
              <AlertCircle size={18} />
              <AlertDescription className="font-bold mr-2">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          {step === 1 ? (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="relative">
                <Mail
                  className="absolute right-4 top-4 text-slate-400"
                  size={20}
                />
                <Input
                  type="email"
                  placeholder="example@mail.com"
                  className="h-14 pr-12 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white focus:border-blue-600 font-bold transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                onClick={handleRequestOtp}
                disabled={isPending || !email}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 rounded-2xl text-lg font-black transition-all active:scale-95"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "إرسال الكود"
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex justify-center" dir="ltr">
                <InputOTP maxLength={6} value={otp} onChange={(v) => setOtp(v)}>
                  <InputOTPGroup className="gap-2">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="w-12 h-14 rounded-xl border-2 border-slate-100 bg-slate-50 text-xl font-black text-blue-600 focus:border-blue-600"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleVerify}
                  disabled={isPending || otp.length < 6}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 rounded-2xl text-lg font-black"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "تحقق الآن"
                  )}
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => {
                    setStep(1);
                    setErrorMessage(null);
                  }}
                  className="w-full h-10 text-slate-400 font-bold rounded-xl hover:text-blue-600"
                >
                  <ArrowRight size={18} className="ml-1" /> رجوع لتعديل الإيميل
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
