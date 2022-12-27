import Head from "next/head";
import {
  Box,
  Button,
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
import { useState } from "react";

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

  return {
    props: {
      posts: posts.map((post: Post) => {
        const { body, metaImage, type, _id, _raw, ...rest } = post;
        return rest;
      }),
      tags: sortedTags,
    },
  };
}

export default function BlogPage({
  posts,
  tags,
}: {
  posts: Post[];
  tags: [string, number][];
}) {
  const [showAll, showAllSet] = useState(false);
  const MAX_SHOW_DATA = 20;
  const HAS_HIDE_DATA = posts.length > MAX_SHOW_DATA;

  const LAST_POSTS = showAll ? posts : posts.slice(0, MAX_SHOW_DATA);

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
        <title>Upstash Blog</title>

        <meta
          key="og:url"
          property="og:url"
          content="https://upstash.com/blog"
        />
        <meta key="og:title" property="og:title" content="Upstash Blog" />
        <meta
          key="og:description"
          property="og:description"
          content="Articles and tutorials from the Upstash team and community."
        />
        <meta
          key="og:image"
          property="og:image"
          content="https://upstash.com/static/logo/og-blog.jpg"
        />

        <meta
          key="twitter:url"
          name="twitter:url"
          content="https://upstash.com/blog"
        />
        <meta key="twitter:title" name="twitter:title" content="Upstash Blog" />
        <meta
          key="twitter:image"
          name="twitter:image"
          content="https://upstash.com/static/logo/og-blog.jpg"
        />
        <meta
          key="twitter:description"
          name="twitter:description"
          content="Articles and tutorials from the Upstash team and community."
        />
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
                      color="black"
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
            {LAST_POSTS.map((post: Post) => {
              return <PostCard key={post.slug} {...post} />;
            })}
          </SimpleGrid>

          <Box mt={10}>
            <Button
              variant="outline"
              hidden={!HAS_HIDE_DATA || showAll}
              onClick={() => {
                showAllSet(true);
              }}
            >
              Show all posts
            </Button>
          </Box>
        </Container>
      </Section>
    </>
  );
}
