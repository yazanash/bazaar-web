// src/app/(fullscreen)/layout.tsx
export default function FullScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* هون ما بنحط لا Header ولا Sidebar */}
      <main>{children}</main>
    </div>
  );
}
