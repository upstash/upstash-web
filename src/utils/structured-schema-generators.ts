export const generateBlogSchema = ({
  headline,
  description,
  keywords,
  authors,
  datePublished,
  dateModified,
  url,
  image,
  wordCount,
  readingTimeMinutes,
}: {
  headline: string;
  description: string;
  keywords: string[];
  authors: { name: string; url?: string }[];
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
  wordCount?: number;
  readingTimeMinutes?: number;
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline,
    description,
    keywords: keywords.join(", "),
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage: "en",
    ...(wordCount ? { wordCount } : {}),
    ...(readingTimeMinutes
      ? { timeRequired: `PT${readingTimeMinutes}M` }
      : {}),
    author: authors.map((a) => ({
      "@type": "Person",
      name: a.name,
      ...(a.url ? { url: a.url } : {}),
    })),
    publisher: {
      "@type": "Organization",
      "@id": "https://upstash.com/#org",
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

export const generateBlogListSchema = ({
  url,
  name,
  description,
  posts,
}: {
  url: string;
  name: string;
  description: string;
  posts: {
    title: string;
    url: string;
    datePublished: string;
    description: string;
    authors?: string[];
  }[];
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${url}#blog`,
    url,
    name,
    description,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      "@id": "https://upstash.com/#org",
      name: "Upstash",
      url: "https://upstash.com",
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: post.url,
      datePublished: post.datePublished,
      description: post.description,
      ...(post.authors && post.authors.length > 0
        ? {
            author: post.authors.map((authorName) => ({
              "@type": "Person",
              name: authorName,
            })),
          }
        : {}),
    })),
  };

  return JSON.stringify(jsonLd);
};

export const generateBreadcrumbSchema = ({
  items,
}: {
  items: { name: string; url: string }[];
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
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
