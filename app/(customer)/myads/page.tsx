import { UserAdCard } from "./Components/UserAdCard";
export default function MyAdsPage() {
    const data = {
  "items": [
    {
      "pubStatus": "accepted",
      "reasone": "",
      "vehicleAdResponse": {
        "id": 2,
        "isFavorite": false,
        "city": { "id": 5, "arabicName": "طرطوس", "englishName": "Tartus" },
        "vehicleModel": { "id": 7, "name": "BMW / 320i", "category": "passenger" },
        "manufactureYear": 2019,
        "thumbnail": "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=400",
        "fuelType": "diesel",
        "installment": false,
        "price": 2500,
        "category": "passenger",
        "slug": "bmw-320i-2019-tartus-10774353",
        "viewsCount": 145,
        "favoritesCount": 12
      }
    },
    {
      "pubStatus": "rejected",
      "reasone": "الصور غير واضحة، يرجى إعادة تصوير السيارة في ضوء النهار.",
      "vehicleAdResponse": {
        "id": 3,
        "isFavorite": true,
        "city": { "id": 1, "arabicName": "دمشق", "englishName": "Damascus" },
        "vehicleModel": { "id": 12, "name": "Mercedes / C200", "category": "passenger" },
        "manufactureYear": 2021,
        "thumbnail": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=400",
        "fuelType": "petrol",
        "installment": true,
        "price": 45000,
        "category": "passenger",
        "slug": "mercedes-c200-2021-damascus",
        "viewsCount": 0,
        "favoritesCount": 0
      }
    },
    {
      "pubStatus": "pending",
      "reasone": "",
      "vehicleAdResponse": {
        "id": 4,
        "isFavorite": false,
        "city": { "id": 3, "arabicName": "حلب", "englishName": "Aleppo" },
        "vehicleModel": { "id": 45, "name": "Toyota / Hilux", "category": "truck" },
        "manufactureYear": 2015,
        "thumbnail": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=400",
        "fuelType": "diesel",
        "installment": false,
        "price": 12000,
        "category": "truck",
        "slug": "toyota-hilux-2015-aleppo",
        "viewsCount": 5,
        "favoritesCount": 1
      }
    }
  ],
  "totalCount": 3,
  "pageNumber": 1,
  "totalPages": 1,
  "pageSize": 20
};
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 pb-24" dir="rtl">
      {/* العنوان */}
      <h2 className="text-2xl font-black text-blue-900 text-center mb-8 mt-4">
        اعلاناتي
      </h2>

      {/* القائمة */}
      <div className="max-w-2xl mx-auto">
        {data.items.map((item: any) => (
          <UserAdCard key={item.vehicleAdResponse.id} ad={item} />
        ))}

        {data.items.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-bold">
            لا يوجد لديك إعلانات حالياً
          </div>
        )}
      </div>
    </div>
  );
}
