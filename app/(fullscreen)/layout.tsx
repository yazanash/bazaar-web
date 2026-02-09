// src/app/(fullscreen)/layout.tsx
export default function FullScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-200">
      {" "}
      {/* خلفية رمادية غامقة للأرضية */}
      <main className="max-w-150 mx-auto w-full min-h-screen bg-[#F0F2F5] shadow-xl">
        {children}
      </main>
    </div>
  );
}
