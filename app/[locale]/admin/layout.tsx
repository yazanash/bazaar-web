"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  MapPin,
  Factory,
  CreditCard,
  Wallet,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Users,
  IdCard,
  LucideCardSim,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { checkAdmin } from "@/lib/actions/admin";
import { logoutAction } from "@/lib/actions/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [checking, setChecking] = useState(true); // حالة التحقق من السيرفر
  const router = useRouter();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await checkAdmin();

        if (response.success) {
          setChecking(false);
        } else {
          router.replace("/");
        }
      } catch (error) {
        console.error("Auth Error:", error);
        router.replace("/");
      }
    };

    verifyAdmin();
  }, [router]);

  if (checking) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin"></div>
          <ShieldCheck
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600"
            size={20}
          />
        </div>
        <p className="font-black text-slate-400 animate-pulse">
          جاري التحقق من الصلاحيات...
        </p>
      </div>
    );
  }
  const menuItems = [
    { title: "الإحصائيات", icon: LayoutDashboard, href: "/admin" },
    { title: "مراجعة الإعلانات", icon: Car, href: "/admin/ads" },
    { title: "إدارة المدن", icon: MapPin, href: "/admin/cities" },
    {
      title: "المصانع والموديلات",
      icon: Factory,
      href: "/admin/manufacturers",
    },
    { title: "الباقات", icon: CreditCard, href: "/admin/packages" },
    { title: "طلبات الدفع", icon: Wallet, href: "/admin/payments" },
    { title: "بوابات الدفع", icon: Settings, href: "/admin/payment-gateways" },
    {
      title: "اللوحات الاعلانية",
      icon: LucideCardSim,
      href: "/admin/ad-banners",
    },
    { title: "الادارة", icon: Users, href: "/admin/admins" },
  ];
  const handleLogout = async () => {
    await logoutAction();
  };
  return (
    <div className="min-h-screen bg-slate-50 flex" dir="rtl">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar الجانبي */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 right-0 z-50 w-72 h-screen bg-white border-l border-slate-200 transition-transform duration-300 lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <div className="font-black text-2xl text-blue-600 tracking-tighter">
              BAZAAR{" "}
              <span className="text-[10px] text-slate-400 block -mt-1 uppercase tracking-widest">
                Control Panel
              </span>
            </div>
            <button
              className="lg:hidden text-slate-400"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 font-bold text-sm",
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-100 ring-4 ring-blue-50"
                      : "text-slate-500 hover:bg-slate-50 hover:text-blue-600",
                  )}
                >
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Footer Sidebar */}
          <div className="p-4 border-t border-slate-50 space-y-2">
            <button
              onClick={handleLogout}
              className=" cursor-pointer flex items-center gap-3 px-4 py-3.5 w-full text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-colors"
            >
              <LogOut size={20} />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header العلوي */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 bg-slate-100 rounded-xl text-slate-600"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/logo.png"
                alt="Bazaar"
                width={40}
                height={40}
                className="w-auto h-10 object-contain"
                priority
              />
            </Link>
            <h2 className="text-lg font-black text-slate-800">لوحة التحكم</h2>
          </div>
        </header>

        <main className="p-6 lg:p-10 max-w-400 mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}
