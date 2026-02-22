"use client";
import Link from "next/link";
import { ChevronLeft, LogOut, ShieldCheck, User } from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";

const UserSettingsComp = () => {
  const handleLogout = async () => {
    await logoutAction();
  };
  return (
    <div className="space-y-3">
      <Link
        href="/profile"
        className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <User size={20} />
          </div>
          <span className="font-bold text-slate-700">تعديل الملف الشخصي</span>
        </div>
        <ChevronLeft size={18} className="text-slate-400" />
      </Link>

      <Link
        href="/privacy"
        className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 text-green-600 rounded-lg">
            <ShieldCheck size={20} />
          </div>
          <span className="font-bold text-slate-700">سياسة الخصوصية</span>
        </div>
        <ChevronLeft size={18} className="text-slate-400" />
      </Link>

      <button
        onClick={handleLogout}
        className="flex cursor-pointer w-full items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-50 text-red-600 rounded-lg">
            <LogOut size={20} />
          </div>
          <span className="font-black">تسجيل الخروج</span>
        </div>
      </button>
    </div>
  );
};

export default UserSettingsComp;
