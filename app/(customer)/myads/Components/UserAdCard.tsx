import { MapPin, Calendar, Eye, Heart, MessageCircle } from "lucide-react";

export function UserAdCard({ ad }: { ad: any }) {
  // تحديد خصائص الـ Status بناءً على الـ pubStatus من الـ API
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "accepted":
        return { label: "تم النشر", color: "bg-green-500", text: "تم قبول إعلانك وهو الآن ظاهر للجميع." };
      case "pending":
        return { label: "قيد المعالجة", color: "bg-orange-400", text: "إعلانك قيد المراجعة من قبل الإدارة حالياً." };
      case "rejected":
        return { label: "رفض الطلب", color: "bg-red-500", text: ad.reasone || "هناك مشكلة في محتوى الإعلان." };
      default:
        return { label: "غير معروف", color: "bg-slate-400", text: "" };
    }
  };

  const status = getStatusConfig(ad.pubStatus);
  const vehicle = ad.vehicleAdResponse;

  return (
    <div className="bg-white rounded-[2rem] p-3 shadow-sm border border-slate-100 mb-4 flex gap-4 relative overflow-hidden">
      
      {/* 1. قسم الصورة مع الـ Label */}
      <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-3xl">
        <img 
          src={vehicle.thumbnail} 
          className="w-full h-full object-cover" 
          alt={vehicle.vehicleModel.name} 
        />
        {/* الـ Label العائم فوق الصورة */}
        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-[10px] font-black text-white ${status.color}`}>
          {status.label}
        </div>
      </div>

      {/* 2. قسم المعلومات والرسالة التوضيحية */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <h3 className="text-lg font-black text-blue-900 leading-tight">
            {vehicle.vehicleModel.name} {vehicle.manufactureYear}
          </h3>
          
          <div className="flex items-center gap-3 mt-1 text-slate-400 font-bold text-[11px]">
             <span className="flex items-center gap-1"><MapPin size={12}/> {vehicle.city.arabicName}</span>
             <span className="flex items-center gap-1 font-black text-blue-600">${vehicle.price.toLocaleString()}</span>
          </div>
        </div>

        {/* 3. مربع النص التوضيحي (الرسالة من الإدارة) */}
        <div className="bg-slate-50 rounded-2xl p-2 mt-2 border border-slate-100">
           <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
             {status.text}
           </p>
        </div>
      </div>

      {/* إحصائيات سريعة (اختياري - بتعطي فخامة) */}
      <div className="absolute left-4 top-4 flex flex-col gap-2 text-slate-300">
         <div className="flex items-center gap-1 text-[10px] font-bold"><Eye size={12}/> {vehicle.viewsCount}</div>
      </div>
    </div>
  );
}