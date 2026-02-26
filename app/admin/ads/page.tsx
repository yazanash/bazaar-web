"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Search, FilterX } from "lucide-react";

const dummyAds = [
  { id: "101", title: "مرسيدس C200 موديل 2022", user: "أحمد علي", date: "2024-05-20", status: "pending", price: "45,000$" },
  { id: "102", title: "تويوتا هايلوكس دبل كبين", user: "شركة المجد", date: "2024-05-19", status: "accepted", price: "32,000$" },
  { id: "103", title: "بي ام دبليو X5 لون أسود", user: "سامر حسن", date: "2024-05-18", status: "rejected", price: "55,000$" },
];

export default function AdsListPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // منطق الفلترة
  const filteredAds = dummyAds.filter(ad => {
    const matchesStatus = statusFilter === "all" || ad.status === statusFilter;
    const matchesSearch = ad.title.includes(searchQuery) || ad.user.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">إدارة الإعلانات</h1>
        <p className="text-slate-500 font-bold mt-1">ابحث، فلتر، وراجع المنشورات</p>
      </div>

      {/* Filter Bar - بار الفلترة */}
      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 min-w-62.5">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="ابحث عن إعلان أو معلن..." 
            className="pr-10 h-12 rounded-xl border-slate-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-45 h-12 rounded-xl border-slate-200 font-bold">
            <SelectValue placeholder="حالة النشر" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل الحالات</SelectItem>
            <SelectItem value="pending">بانتظار المراجعة</SelectItem>
            <SelectItem value="accepted">المقبولة</SelectItem>
            <SelectItem value="rejected">المرفوضة</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          variant="ghost" 
          onClick={() => { setStatusFilter("all"); setSearchQuery(""); }}
          className="h-12 rounded-xl text-slate-500 font-bold"
        >
          <FilterX size={18} className="ml-2" />
          إعادة تعيين
        </Button>
      </div>

      {/* Table - الجدول */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="text-right font-black p-5">الإعلان</TableHead>
              <TableHead className="text-right font-black">المعلن</TableHead>
              <TableHead className="text-right font-black">الحالة</TableHead>
              <TableHead className="text-right font-black">السعر</TableHead>
              <TableHead className="text-center font-black">الإجراء</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAds.map((ad) => (
              <TableRow key={ad.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-bold p-5">
                  <div className="flex flex-col">
                    <span>{ad.title}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{ad.date}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600 font-bold text-sm">{ad.user}</TableCell>
                <TableCell>
                  <StatusBadge status={ad.status} />
                </TableCell>
                <TableCell className="font-black text-blue-600">{ad.price}</TableCell>
                <TableCell className="text-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-xl font-bold border-slate-200 hover:bg-blue-600 hover:text-white"
                    onClick={() => router.push(`/admin/ads/${ad.id}`)}
                  >
                    <Eye size={16} className="ml-2" />
                    مراجعة
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// مكون Badge الحالة
function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    pending: { label: "قيد المراجعة", className: "bg-amber-50 text-amber-600 border-amber-100" },
    accepted: { label: "تم القبول", className: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    rejected: { label: "مرفوض", className: "bg-red-50 text-red-600 border-red-100" },
  };
  const config = configs[status];
  return (
    <Badge variant="outline" className={`rounded-lg px-3 py-1 font-bold ${config.className}`}>
      {config.label}
    </Badge>
  );
}