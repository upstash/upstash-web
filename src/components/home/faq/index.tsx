import { HOME_FAQ } from "@/components/home/faq/faq-data";
import { generateFaqSchema } from "@/utils/structured-schema-generators";

/**
 * The visible home-page FAQ section was removed, but the FAQPage structured
 * data is kept for SEO. This component only emits the JSON-LD script.
 */
export default function HomeFaq() {
  const faqSchema = generateFaqSchema({ faq: HOME_FAQ });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: faqSchema }}
    />
  );
}
