"use client";

import { 
  Area, AreaChart, Bar, BarChart, CartesianGrid, 
  Pie, PieChart, XAxis, ResponsiveContainer, Cell 
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  Car, Clock, DollarSign, TrendingUp 
} from "lucide-react";
import React from "react";

// 1. إعدادات الشارت (Shadcn Config)
const adsConfig = {
  ads: {
    label: "الإعلانات",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const statusConfig = {
  accepted: { label: "مقبول", color: "#10b981" },
  pending: { label: "معلق", color: "#f59e0b" },
  rejected: { label: "مرفوض", color: "#ef4444" },
} satisfies ChartConfig;

// 2. الداتا الوهمية
const growthData = [
  { month: "Jan", ads: 450 },
  { month: "Feb", ads: 520 },
  { month: "Mar", ads: 890 },
  { month: "Apr", ads: 600 },
  { month: "May", ads: 750 },
  { month: "Jun", ads: 920 },
];

const pieData = [
  { status: "accepted", count: 1200, fill: "var(--color-accepted)" },
  { status: "pending", count: 150, fill: "var(--color-pending)" },
  { status: "rejected", count: 80, fill: "var(--color-rejected)" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900">لوحة التحكم</h1>
          <p className="text-slate-500 font-bold">ملخص أداء النظام والعمليات الحالية</p>
        </div>
      </div>

      {/* Stats Cards - الكروت العلوية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="إجمالي الإعلانات" value="1,540" icon={<Car />} color="text-blue-600" />
        <StatCard title="بانتظار المراجعة" value="12" icon={<Clock />} color="text-amber-600" />
        <StatCard title="الدخل الشهري" value="4.2M" sub="ل.س" icon={<DollarSign />} color="text-emerald-600" />
        <StatCard title="النمو المالي" value="+12.5%" icon={<TrendingUp />} color="text-indigo-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* شارت نمو الإعلانات باستخدام Shadcn Container */}
        <Card className="lg:col-span-2 rounded-[2rem] shadow-sm border-slate-100">
          <CardHeader>
            <CardTitle className="font-black text-lg">تحليل المنشورات</CardTitle>
            <CardDescription className="font-bold">معدل إضافة الإعلانات خلال الأشهر الأخيرة</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={adsConfig} className="h-75 w-full">
              <AreaChart data={growthData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8} 
                  tickFormatter={(value) => value.slice(0, 3)} 
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  dataKey="ads"
                  type="natural"
                  fill="var(--color-ads)"
                  fillOpacity={0.1}
                  stroke="var(--color-ads)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* شارت حالة الإعلانات (Pie) */}
        <Card className="rounded-[2rem] shadow-sm border-slate-100">
          <CardHeader className="items-center pb-0">
            <CardTitle className="font-black text-lg">حالات الإعلانات</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer config={statusConfig} className="mx-auto aspect-square max-h-62.5">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={pieData} dataKey="count" nameKey="status" innerRadius={60} strokeWidth={5}>
                   {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="flex flex-col gap-2 p-4">
               {pieData.map((item) => (
                 <div key={item.status} className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-500 capitalize">{statusConfig[item.status as keyof typeof statusConfig].label}</span>
                    <span className="font-black text-slate-800">{item.count}</span>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, sub, icon, color }: any) {
  return (
    <Card className="rounded-[2rem] border-slate-100 shadow-sm overflow-hidden border-none bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-2xl bg-slate-50 ${color}`}>
            {React.cloneElement(icon, { size: 24 })}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{value}</h3>
            {sub && <span className="text-[10px] font-bold text-slate-400">{sub}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}