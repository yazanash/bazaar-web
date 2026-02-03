
import { VehicleCard } from "../components/home/VehicleCard";
export default function FavoritesPage() {
  return (
    <div className="py-2 space-y-8 max-w-full">
      
      <section className="px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-black text-slate-800">Favorites Ads</h2>
        </div>

        {/* الـ Grid اللي بيعرض الصور */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-20">
          <VehicleCard />
          <VehicleCard />
          <VehicleCard />
          <VehicleCard />
        </div>
      </section>
    </div>
  );
}
