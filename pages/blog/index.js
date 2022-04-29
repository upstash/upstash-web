import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Tag,
  Text,
  Wrap,
} from "@chakra-ui/react";
import PostCard from "components/post-card";
import Bg from "components/bg";
import Section from "components/section";
import { flatten, countBy } from "lodash";
import { compareDesc } from "date-fns";
import { allBlogs } from "contentlayer/generated";

export async function getStaticProps() {
  const posts = allBlogs
    .filter((p) => p.categories)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });
  // .slice(0, 10);

  return { props: { posts } };
}

export default function CareerPage({ posts }) {
  const { undefined, ...categories } = countBy(
    flatten(posts.map((post) => post.categories))
  );
  const sortedCategories = Object.entries(categories).sort(
    (a, b) => b[1] - a[1]
  );

  const colors = [
    "red",
    "cyan",
    "purple",
    "orange",
    "green",
    "teal",
    "gray",
    "pink",
    "blue",
    "yellow",
  ];

  return (
    <>
      <Head>
        <title>Blog - Upstash</title>
      </Head>

      <Box as="section" py={["60px", "80px"]} textAlign="center">
        <Container maxW="5xl">
          <Box as="header">
            <Heading as="h1" fontWeight="extrabold" size="3xl">
              Blog
            </Heading>
            <Box mt="24px" fontSize={["md", "xl"]} color="whiteAlpha.700">
              <Text>Blog posts from the Upstash team and community.</Text>
            </Box>
          </Box>

          <Wrap justify="center" spacing="8px" mt="24px" maxW="2xl" mx="auto">
            {sortedCategories.slice(0, 10).map(([key, count], index) => {
              return (
                <Tag
                  as={Button}
                  key={key}
                  size="lg"
                  variant="subtle"
                  colorScheme={`${colors[index]}`}
                >
                  {key}
                </Tag>
              );
            })}
          </Wrap>
        </Container>
      </Box>

      <Section pt={["80px", "140px"]}>
        <Bg />

        <Container maxW="5xl">
          <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="24px">
            {posts.map((post) => {
              return <PostCard key={post.slug} {...post} />;
            })}
          </SimpleGrid>
        </Container>
      </Section>
    </>
  );
}
