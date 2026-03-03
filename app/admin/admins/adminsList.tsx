"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  Mail,
  UserMinus,
  Loader2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { AdminUser } from "@/types/enums";
import { addAdminRole, revokeAdmin } from "@/lib/actions/admin";

export default function AdminsManagement({
  initialAdmins,
}: {
  initialAdmins: AdminUser[];
}) {
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [confirmPromote, setConfirmPromote] = useState(false);
  const [confirmRevoke, setConfirmRevoke] = useState<AdminUser | null>(null);

  const handlePromote = async () => {
    if (!newEmail) return;
    setLoading(true);
    try {
      const res = await addAdminRole(newEmail);
      if (res.success) {
        toast.success("تمت ترقية المستخدم إلى مدير بنجاح");
        setNewEmail("");
        setConfirmPromote(false);
      } else if (res.status === 404) {
        toast.error("هذا المستخدم غير موجود");
      }
    } catch (error) {
      toast.error("فشل في ترقية المستخدم");
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async () => {
    if (!confirmRevoke) return;
    setLoading(true);
    try {
      console.log(confirmRevoke.id);
      const response = await revokeAdmin(confirmRevoke.id);
      if (response.success) {
        setAdmins((prev) => prev.filter((a) => a.id !== confirmRevoke.id));
        toast.success("تم إلغاء صلاحيات المدير");
      } else {
        toast.error(`لا يمكن اتمام هذه العملية`);
      }

      setConfirmRevoke(null);
    } catch (error) {
      toast.error("حدث خطأ أثناء إلغاء الصلاحية");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-8" dir="rtl">
      {/* 1. قسم إضافة أدمن جديد */}
      <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row items-end gap-6">
          <div className="flex-1 space-y-3 w-full">
            <label className="text-lg font-black text-slate-800 flex items-center gap-2">
              <UserPlus className="text-blue-600" size={20} />
              ترقية مدير جديد
            </label>
            <div className="relative">
              <Input
                placeholder="أدخل البريد الإلكتروني للمستخدم..."
                className="h-14 rounded-2xl border-slate-200 pr-12 font-bold focus:ring-blue-100"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <Mail
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
            </div>
          </div>
          <Button
            onClick={() => setConfirmPromote(true)}
            disabled={!newEmail || loading}
            className="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 font-black text-lg shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            ترقية لصلاحية مدير
          </Button>
        </div>
      </section>

      {/* 2. قائمة المديرين الحاليين */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <ShieldCheck className="text-green-500" />
          المديرين الحاليين
          <span className="text-sm font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full mr-2">
            {admins.length}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {admins.map((admin) => (
            <Card
              key={admin.id}
              className="rounded-3xl border-slate-100 hover:border-blue-200 transition-all group shadow-sm overflow-hidden"
            >
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-400 uppercase tracking-tight">
                      Admin User
                    </span>
                    <span className="text-slate-700 font-bold">
                      {admin.email}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setConfirmRevoke(admin)}
                  className="rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600"
                >
                  <UserMinus size={20} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AlertDialog open={confirmPromote} onOpenChange={setConfirmPromote}>
        <AlertDialogContent
          className="rounded-[2rem] border-none shadow-2xl"
          dir="rtl"
        >
          <AlertDialogHeader>
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="text-blue-600" size={32} />
            </div>
            <AlertDialogTitle className="text-2xl font-black text-center">
              تأكيد الترقية
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center font-bold text-slate-500">
              هل أنت متأكد من منح صلاحيات المدير للمستخدم <br />
              <span className="text-blue-600">{newEmail}</span>؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-3 mt-6">
            <AlertDialogAction
              onClick={handlePromote}
              className="flex-1 h-12 rounded-xl bg-blue-600 font-black"
            >
              نعم، قم بالترقية
            </AlertDialogAction>
            <AlertDialogCancel className="flex-1 h-12 rounded-xl font-bold">
              إلغاء
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={!!confirmRevoke}
        onOpenChange={() => setConfirmRevoke(null)}
      >
        <AlertDialogContent
          className="rounded-[2rem] border-none shadow-2xl"
          dir="rtl"
        >
          <AlertDialogHeader>
            <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <ShieldAlert className="text-red-600" size={32} />
            </div>
            <AlertDialogTitle className="text-2xl font-black text-center">
              إلغاء صلاحية
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center font-bold text-slate-500">
              هل أنت متأكد من سحب صلاحيات الإدارة من <br />
              <span className="text-red-600">{confirmRevoke?.email}</span>؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-3 mt-6">
            <AlertDialogAction
              onClick={handleRevoke}
              className="flex-1 h-12 rounded-xl bg-red-600 hover:bg-red-700 font-black"
            >
              نعم، سحب الصلاحية
            </AlertDialogAction>
            <AlertDialogCancel className="flex-1 h-12 rounded-xl font-bold">
              إلغاء
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
