export const generateBlogSchema = ({
  blogName,
  blogDescription,
  keywords,
  authorName,
  authorUrl,
  datePublished,
}: {
  blogName: string;
  blogDescription: string;
  keywords: string[];
  authorName: string;
  authorUrl: string;
  datePublished: string;
}) => {
  const jsonLdBlog = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blogName,
    description: blogDescription,
    keywords: keywords.join(" "),
    image: [
      "https://example.com/photos/1x1/photo.jpg",
      "https://example.com/photos/4x3/photo.jpg",
      "https://example.com/photos/16x9/photo.jpg",
    ],
    datePublished: datePublished,
    author: [
      {
        "@type": "Person",
        name: authorName,
        url: authorUrl,
      },
    ],
  };

  return JSON.stringify(jsonLdBlog);
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
