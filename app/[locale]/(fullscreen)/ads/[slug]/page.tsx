import VehicleDetailsPage from "@/components/AdDetailsComponents/DetailsPage";
import { notFound } from "next/navigation";
import { getAdBySlug } from "@/lib/actions/ads";
import { Metadata } from "next";
import { getImageUrl } from "@/lib/utils";
function stripHtml(html: string) {
  return html?.replace(/<[^>]*>?/gm, "") || "";
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const isAr = lang === "ar";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bazaar-963.com";

  const response = await getAdBySlug(slug);
  const ad = response.data;

  if (!ad) return { title: isAr ? "الإعلان غير موجود" : "Ad Not Found" };

  const carName = ad.vehicleModel.name;
  const cityName = isAr ? ad.city.arabicName : ad.city.englishName;

  const title = isAr
    ? `${carName} ${ad.manufactureYear} للبيع في ${cityName}`
    : `${carName} ${ad.manufactureYear} for sale in ${cityName}`;

  const ogImage =
    ad.gallery && ad.gallery.length > 0
      ? getImageUrl(ad.gallery[0])
      : getImageUrl(ad.thumbnail);

  return {
    title: title,
    description: isAr
      ? `شاهد تفاصيل ${carName} موديل ${ad.manufactureYear} في ${cityName}. السعر: ${ad.price}$. تواصل مع البائع الآن.`
      : `Check out details for ${carName} ${ad.manufactureYear} in ${cityName}. Price: ${ad.price}$. Contact seller now.`,
    openGraph: {
      title: title,
      images: [ogImage],
      type: "article",
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/ads/${slug}`, // يفضل الرابط الكامل هنا
      languages: {
        "ar-SA": `${baseUrl}/ar/ads/${slug}`,
        "en-US": `${baseUrl}/en/ads/${slug}`,
        "x-default": `${baseUrl}/ar/ads/${slug}`,
      },
    },
  };
}

// 2. المكون الأساسي للصفحة
export default async function AdDetailsPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>; // تعديل الـ Type هنا ليتوافق مع Next 15
}) {
  const { slug, lang } = await params; // انتظار الـ params
  const isAr = lang === "ar";

  try {
    const adData = await getAdBySlug(slug);
    const ad = adData.data;

    if (adData.status == 404 || !ad) {
      return notFound();
    }

    // إضافة البيانات المهيكلة (JSON-LD) لتحسين ظهور جوجل (Rich Snippets)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Car",
      name: ad.vehicleModel.name,
      image: getImageUrl(ad.thumbnail),
      description: stripHtml(ad.description).slice(0, 200),
      offers: {
        "@type": "Offer",
        price: ad.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    };

    return (
      <>
        {/* حقن الـ JSON-LD في الـ Head */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <VehicleDetailsPage data={ad} />
      </>
    );
  } catch (error) {
    console.error("Error fetching ad details:", error);
    return notFound();
  }
}
