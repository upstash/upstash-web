import Head from "next/head";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Tag,
  Text,
  Tooltip,
  Wrap,
} from "@chakra-ui/react";
import PostCard from "components/post-card";
import Bg from "components/bg";
import Section from "components/section";
import { flatten, countBy } from "lodash";
import { compareDesc } from "date-fns";
import { allBlogs } from "contentlayer/generated";
import NextLink from "next/link";

export async function getStaticProps() {
  const posts = allBlogs
    .filter((p) => p.tags?.length > 0)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  const { undefined, ...tags } = countBy(
    flatten(posts.map((post) => post.tags))
  );
  const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1]);

  return { props: { posts, tags: sortedTags } };
}

export default function CareerPage({ posts, tags }) {
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
            {tags.slice(0, 10).map(([key, count], index) => {
              return (
                <NextLink href={`/blog/tag/${key}`}>
                  <a>
                    <Tooltip
                      key={key}
                      label="Hey, I'm here!"
                      aria-label="A tooltip"
                    >
                      <Tag
                        key={key}
                        size="lg"
                        variant="subtle"
                        colorScheme={`${colors[index]}`}
                        textTransform="capitalize"
                        py={3}
                      >
                        {key}
                      </Tag>
                    </Tooltip>
                  </a>
                </NextLink>
              );
            })}
          </Wrap>
        </Container>
      </Box>

      <Section pt={["80px", "140px"]}>
        <Bg />

        <Container maxW="5xl">
          <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={8}>
            {posts.map((post) => {
              return <PostCard key={post.slug} {...post} />;
            })}
          </SimpleGrid>
        </Container>
      </Section>
    </>
  );
}
