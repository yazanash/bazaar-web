import Link from "next/link";
import { Car, Motorbike, Truck } from "lucide-react";

export function Categories() {
  const cats = [
    { id: "cars", label: "سيارات", icon: Car, href: "/category/cars" },
    { id: "bikes", label: "موتورات", icon: Motorbike, href: "/category/bikes" },
    { id: "trucks", label: "شاحنات", icon: Truck, href: "/category/trucks" },
  ];

  return (
    <div className="px-4 py-4">
      {/* شبكة أزرار بحدود واضحة */}
      <div className="flex gap-3">
        {cats.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center gap-2 py-4 
                         bg-white border-2 border-slate-200 rounded-2xl
                         hover:border-blue-400 hover:bg-blue-50/30 
                         transition-all duration-300 group shadow-sm active:scale-95"
            >
              {/* الأيقونة داخل دائرة بسيطة أو لوحدها */}
              <Icon
                size={28}
                className="text-slate-500 group-hover:text-blue-600 transition-colors"
                strokeWidth={2}
              />

              <span className="text-sm font-black text-slate-700 group-hover:text-blue-700">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
