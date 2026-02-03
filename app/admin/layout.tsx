export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-100">
      <aside className="w-64 bg-slate-800 text-white p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-8">لوحة الإدارة</h2>
        <nav className="flex flex-col gap-4">
          <a href="/Admin" className="hover:text-blue-400">الرئيسية</a>
          <a href="/Admin/vehicles" className="hover:text-blue-400">الإعلانات</a>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}