import Head from "next/head";
import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import PostCard from "components/post-card";
import Bg from "components/bg";
import Section from "components/section";
import { allBlogs } from "contentlayer/generated";
import { countBy, flatten, toLower } from "lodash";

export async function getStaticPaths() {
  const { undefined, ...categories } = countBy(
    flatten(allBlogs.map((p) => p.categories?.map((c) => toLower(c))))
  );

  console.log(categories);

  const paths = Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => ({
      params: { category: key },
    }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = allBlogs.filter((post) => {
    return post.categories?.find((c) => toLower(c) === params.category);
  });

  if (!posts.length) {
    return {
      redirect: {
        destination: "/404",
      },
    };
  }

  return {
    props: {
      posts,
    },
  };
}

export default function CareerPage({ posts }) {
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
