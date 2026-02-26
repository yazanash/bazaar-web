"use client";

import { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, CheckCircle, XCircle, ExternalLink, User, Mail, Phone, CreditCard, Package 
} from "lucide-react";

// داتا وهمية للطلبات
const initialRequests = [
  { 
    id: "PAY-9921", 
    userName: "علاء جاسم", 
    email: "alaa@gmail.com", 
    phone: "0991234567", 
    gateway: "الهرم للحوالات", 
    packageName: "الباقة الذهبية", 
    amount: "125,000",
    status: "pending",
    date: "2024-05-21 14:30"
  },
  { 
    id: "PAY-9922", 
    userName: "نور الهدى", 
    email: "nour@outlook.com", 
    phone: "0933445566", 
    gateway: "سيريتل كاش", 
    packageName: "الباقة الفضية", 
    amount: "50,000",
    status: "pending",
    date: "2024-05-21 15:10"
  }
];

export default function PaymentRequestsPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">طلبات الدفع والاشتراكات</h1>
        <p className="text-slate-500 font-bold mt-1">راجع وصولات الدفع وفعل باقات المستخدمين</p>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="ابحث باسم المستخدم، الإيميل، أو رقم الطلب..." 
            className="pr-10 h-12 rounded-xl border-slate-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden text-right">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="border-none">
              <TableHead className="p-5 text-right font-black">المستخدم</TableHead>
              <TableHead className="text-right font-black">تفاصيل الاتصال</TableHead>
              <TableHead className="text-right font-black">الباقة والمبلغ</TableHead>
              <TableHead className="text-right font-black">بوابة الدفع</TableHead>
              <TableHead className="text-center font-black">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <TableCell className="p-5">
                  <div className="flex flex-col">
                    <span className="font-black text-slate-800">{req.userName}</span>
                    <span className="text-[10px] font-bold text-blue-500 tracking-tighter">ID: {req.id}</span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Mail size={14} className="text-slate-400" /> {req.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Phone size={14} className="text-slate-400" /> {req.phone}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge variant="outline" className="w-fit bg-amber-50 text-amber-700 border-amber-100 font-bold">
                      <Package size={12} className="ml-1" /> {req.packageName}
                    </Badge>
                    <span className="font-black text-slate-900">{req.amount} ل.س</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 font-bold text-slate-700">
                    <CreditCard size={16} className="text-slate-400" />
                    {req.gateway}
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button 
                      size="sm" 
                      className="rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold shadow-lg shadow-emerald-50"
                      onClick={() => alert("تم تفعيل الباقة وإرسال إشعار للمستخدم")}
                    >
                      <CheckCircle size={16} className="ml-1" /> تفعيل
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-xl border-slate-200 font-bold text-slate-600"
                      onClick={() => window.open("#", "_blank")} // هنا يفتح صورة الوصل
                    >
                      <ExternalLink size={16} className="ml-1" /> الوصل
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl">
                      <XCircle size={20} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}