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
import { flatten, countBy, omit } from "lodash";
import { compareDesc } from "date-fns";
import { allPosts } from "contentlayer/generated";
import type { Post } from "contentlayer/generated";
import NextLink from "next/link";
import { TAG_NAMES, BANNED_TAGS } from "constants/";

export async function getStaticProps() {
  const posts: Post[] = allPosts
    .filter((p) => p.tags?.length > 0)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  const tags = omit(
    countBy(flatten(posts.map((post) => post.tags))),
    BANNED_TAGS
  );

  const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1]);

  return { props: { posts, tags: sortedTags } };
}

export default function CareerPage({
  posts,
  tags,
}: {
  posts: Post[];
  tags: [string, number][];
}) {
  const colors = [
    "red",
    "cyan",
    "orange",
    "purple",
    "green",
    "pink",
    "blue",
    "gray",
    "teal",
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
              <Text>
                Articles and tutorials from the Upstash team and community.
              </Text>
            </Box>
          </Box>

          <Wrap justify="center" spacing="8px" mt="24px" maxW="2xl" mx="auto">
            {tags.slice(0, 10).map(([tag, count], index) => {
              return (
                <NextLink key={tag} href={`/blog/tag/${tag}`}>
                  <a>
                    <Tooltip
                      label={`Filter by ${tag}`}
                      aria-label={`Filter by ${tag}`}
                    >
                      <Tag
                        key={tag}
                        size="lg"
                        variant="subtle"
                        colorScheme={`${colors[index]}`}
                        textTransform="capitalize"
                        py={3}
                      >
                        {TAG_NAMES[tag] || tag}
                      </Tag>
                    </Tooltip>
                  </a>
                </NextLink>
              );
            })}
          </Wrap>
        </Container>
      </Box>

      <Section py={["80px", "140px"]}>
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
