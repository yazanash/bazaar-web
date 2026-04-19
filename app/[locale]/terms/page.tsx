import { TermsArabic } from "./ar-content";
import { TermsEnglish } from "./en-content";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supportEmail = "trio3verse@gmail.com"; // استبدله بإيميل الدعم الخاص بك
  const mailSubject =
    locale === "ar" ? "طلب حذف حساب" : "Account Deletion Request";
  const mailBody =
    locale === "ar"
      ? "يرجى كتابة رقم الهاتف أو البريد الإلكتروني المرتبط بالحساب الذي ترغب في حذفه:"
      : "Please provide the phone number or email associated with the account you wish to delete:";

  const mailtoLink = `mailto:${supportEmail}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* بوكس الشروط والأحكام */}
        <div className="bg-white shadow-sm rounded-2xl p-8 md:p-12 border border-gray-100">
          {locale === "ar" ? <TermsArabic /> : <TermsEnglish />}
        </div>

        {/* بوكس حذف الحساب (مطلب جوجل) */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className={locale === "ar" ? "text-right" : "text-left"}>
              <h2 className="text-xl font-bold text-red-800">
                {locale === "ar" ? "حذف الحساب" : "Account Deletion"}
              </h2>
              <p className="text-red-600 mt-2 text-sm md:text-base">
                {locale === "ar"
                  ? "إذا كنت ترغب في حذف حسابك وبياناتك نهائياً من بازار 963، يرجى تقديم طلب عبر البريد الإلكتروني."
                  : "If you wish to permanently delete your account and data from Bazaar 963, please submit a request via email."}
              </p>
            </div>

            <a
              href={mailtoLink}
              className="whitespace-nowrap bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition duration-300 shadow-md shadow-red-200"
            >
              {locale === "ar" ? "إرسال طلب الحذف" : "Send Deletion Request"}
            </a>
          </div>
        </div>
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
