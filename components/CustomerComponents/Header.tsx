"use client";
import { Heart, Home, Plus, Search, User, Languages } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function UnifiedHeader() {
  const t = useTranslations("layout");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath || `/${nextLocale}`);
  };

  return (
    <header className="sticky top-0 z-110 bg-[#1A68A6] text-white shadow-md w-full">
      {/* الحاوية الرئيسية */}
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-3">
        {/* السطر الأول: اللوجو واسم التطبيق (وسط في الموبايل، يسار في الديسكتوب) */}
        <div className="flex items-center justify-between md:justify-start gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Bazaar"
              width={32}
              height={32}
              className="w-auto h-8"
              priority
            />
            <span className="font-bold text-xl tracking-wide">Bazaar963</span>
          </Link>

          {/* أزرار الحساب والإضافة تظهر فقط في الديسكتوب بالسطر الأول */}
          <nav className="hidden md:flex items-center gap-2 ml-auto">
            <HeaderLink
              href="/myads"
              icon={<Plus size={20} />}
              label={t("links.myAds")}
            />
            <HeaderLink
              href="/user-settings"
              icon={<User size={20} />}
              label={t("links.myAccount")}
            />
          </nav>
        </div>

        {/* السطر الثاني: البحث + اللغة + المفضلة */}
        <div className="flex items-center gap-2 w-full">
          {/* زر اللغة */}
          <button
            onClick={toggleLanguage}
            className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
            title="Change Language"
          >
            {locale === "ar" ? "en" : "ع"}
          </button>

          {/* مربع البحث - يأخذ أكبر مساحة ممكنة */}
          <Link
            href="/search"
            className="flex-1 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center px-4 text-white/80 text-sm border border-white/20 hover:bg-white/20 transition-all"
          >
            <Search size={18} className={locale === "ar" ? "ml-2" : "mr-2"} />
            <span>{t("search")}</span>
          </Link>

          {/* المفضلة */}
          <Link
            href="/favorites"
            className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-white"
          >
            <Heart size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}

function HeaderLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-white hover:bg-white/20 transition-all font-bold text-sm"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
