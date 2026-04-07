import { TermsArabic } from "./ar-content";
import { TermsEnglish } from "./en-content";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-2xl p-8 md:p-12 border border-gray-100">
        {locale === "ar" ? <TermsArabic /> : <TermsEnglish />}
      </div>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title:
      locale === "ar"
        ? "الشروط والأحكام | بازار 963"
        : "Terms & Conditions | Bazaar 963",
  };
}
