import SectionHero from "components/section-hero";
import SectionWhat from "components/section-what";
import SectionSupport from "components/section-support";
import SectionFaq from "components/section-faq";
import SectionInfo from "components/section-info";
import { Box } from "@chakra-ui/react";
import Link from "components/link";
import Bg from "components/bg";
import dynamic from "next/dynamic";

const SectionPricing = dynamic(() => import("components/section-pricing"), {
  ssr: false,
});
const Investors = dynamic(() => import("components/investors"), {
  ssr: false,
});
const SectionTestimonial = dynamic(
  () => import("components/section-testimonial"),
  {
    ssr: false,
  }
);

export default function HomePage() {
  return (
    <>
      <SectionHero />
      <SectionInfo />
      <SectionWhat />
      <SectionPricing />
      <Box
        as="section"
        pos="relative"
        overflow="hidden"
        py={["100px", "140px"]}
        textAlign="center"
      >
        <Bg />
        <Investors />
        <Box mt={16}>
          <Link href="/about">See the full list</Link>
        </Box>
      </Box>
      <SectionTestimonial />
      <SectionSupport />
      <SectionFaq />
    </>
  );
}
