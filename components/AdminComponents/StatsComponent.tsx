"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Pie,
  PieChart,
  XAxis,
  Cell,
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
import { Car, Clock, DollarSign, TrendingUp } from "lucide-react";
import React from "react";
import { Stats } from "@/types/admin";

const adsConfig = {
  ads: {
    label: "الإعلانات",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

const statusConfig = {
  accepted: { label: "مقبول", color: "#10b981" },
  pending: { label: "معلق", color: "#f59e0b" },
  rejected: { label: "مرفوض", color: "#ef4444" },
} satisfies ChartConfig;
interface StatsProps {
  stats: Stats | null;
}
export default function StatsComponent({ stats }: StatsProps) {
  if (!stats) {
    return <h1>No Data</h1>;
  }
  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900">لوحة التحكم</h1>
          <p className="text-slate-500 font-bold">
            ملخص أداء النظام والعمليات الحالية
          </p>
        </div>
      </div>

      {/* Stats Cards - الكروت العلوية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="إجمالي الإعلانات"
          value={stats?.summary.totalAds}
          icon={<Car />}
          color="text-blue-600"
        />
        <StatCard
          title="بانتظار المراجعة"
          value={stats?.summary.pendingAds}
          icon={<Clock />}
          color="text-amber-600"
        />
        <StatCard
          title="الدخل الشهري"
          value={stats?.summary.monthlyRevenue}
          sub="$"
          icon={<DollarSign />}
          color="text-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* شارت نمو الإعلانات باستخدام Shadcn Container */}
        <Card className="lg:col-span-2 rounded-[2rem] shadow-sm border-slate-100">
          <CardHeader>
            <CardTitle className="font-black text-lg">
              تحليل المنشورات
            </CardTitle>
            <CardDescription className="font-bold">
              معدل إضافة الإعلانات خلال الأشهر الأخيرة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={adsConfig} className="h-75 w-full">
              <AreaChart
                data={stats?.growthData}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                />
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
                  stroke="#3b82f6"
                  fillOpacity={0.2}
                  fill="#3b82f6"
                  strokeWidth={3}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* شارت حالة الإعلانات (Pie) */}
        <Card className="rounded-[2rem] shadow-sm border-slate-100">
          <CardHeader className="items-center pb-0">
            <CardTitle className="font-black text-lg">
              حالات الإعلانات
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={statusConfig}
              className="mx-auto aspect-square max-h-62.5"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={stats?.statusData}
                  dataKey="count"
                  nameKey="status"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  {stats?.statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        statusConfig[entry.status as keyof typeof statusConfig]
                          ?.color || "#cbd5e1"
                      }
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="flex flex-col gap-2 p-4">
              {stats?.statusData.map((item) => (
                <div
                  key={item.status}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="font-bold text-slate-500 capitalize">
                    {
                      statusConfig[item.status as keyof typeof statusConfig]
                        .label
                    }
                  </span>
                  <span className="font-black text-slate-800">
                    {item.count}
                  </span>
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
  // استخراج اللون الأساسي لتحويله لخلفية شفافة
  const bgColorClass = color.replace("text-", "bg-").replace("600", "500/10");

  return (
    <Card className="relative rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden group hover:shadow-xl hover:shadow-slate-200 transition-all duration-500">
      <div
        className={`absolute left-1 top-1 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-700 ${color}`}
      >
        {React.cloneElement(icon, { size: 140 })}
      </div>

      <CardContent className="p-8 relative z-10">
        <div className="flex flex-col gap-6">
          <div
            className={`w-14 h-14 rounded-2xl ${bgColorClass} ${color} flex items-center justify-center shadow-inner transition-transform duration-500 `}
          >
            {React.cloneElement(icon, { size: 28, strokeWidth: 2.5 })}
          </div>

          <div className="space-y-1">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">
              {title}
            </p>

            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter">
                {value?.toLocaleString() || "0"}
              </h3>
              {sub && (
                <span className={`text-lg font-black ${color} opacity-80`}>
                  {sub}
                </span>
              )}
            </div>

            <div className="pt-4 flex items-center gap-2">
              <div className="h-1 flex-1 bg-slate-50 rounded-full overflow-hidden">
                <div
                  className={`h-full w-2/3 rounded-full opacity-40 ${color.replace("text-", "bg-")}`}
                ></div>
              </div>
              <span className="text-[9px] font-black text-slate-300 uppercase">
                Live Stats
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
