export const generateBlogSchema = ({
  headline,
  description,
  keywords,
  authorName,
  authorUrl,
  datePublished,
  url,
  image,
}: {
  headline: string;
  description: string;
  keywords: string[];
  authorName: string;
  authorUrl: string;
  datePublished: string;
  url: string;
  image?: string;
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    keywords: keywords.join(", "),
    datePublished,
    author: [
      {
        "@type": "Person",
        name: authorName,
        url: authorUrl,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Upstash",
      url: "https://upstash.com",
      logo: {
        "@type": "ImageObject",
        url: "https://upstash.com/icons/favicon-32x32.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(image ? { image } : {}),
  };

  return JSON.stringify(jsonLd);
};

export const generateFaqSchema = ({
  faq,
}: {
  faq: { question: string; answer: string }[];
}) => {
  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => {
      return {
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      };
    }),
  };

  return JSON.stringify(jsonLdFAQ);
};
