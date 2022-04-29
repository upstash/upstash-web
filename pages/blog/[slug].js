import Head from "next/head";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allBlogs } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import NextLink from "next/link";

export async function getStaticPaths() {
  const paths = allBlogs.map((doc) => ({ params: { slug: doc.slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = allBlogs.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

  const indexOfPost = posts.findIndex((doc) => doc.slug === params.slug);

  const post = posts[indexOfPost];
  const nextPost = indexOfPost > 0 ? posts[indexOfPost - 1] : null;
  const prevPost =
    indexOfPost < posts.length - 1 ? posts[indexOfPost + 1] : null;

  return {
    props: {
      post,
      prevPost,
      nextPost,
    },
  };
}

export default function CareerDetailPage({ post, prevPost, nextPost }) {
  const Component = useMDXComponent(post.body.code);

  return (
    <>
      <Head>
        <title>Careers - Upstash</title>
      </Head>

      <Box as="section" py={["80px", "100px"]}>
        <Container maxW="3xl">
          <Box as="header">
            <Heading
              as="h1"
              fontWeight="bold"
              size="2xl"
              lineHeight="shorter"
              letterSpacings="tight"
            >
              {post.title}
            </Heading>

            <Text
              mt="16px"
              color="whiteAlpha.600"
              as="time"
              dateTime={post.date}
              className="block text-sm text-slate-600"
            >
              {format(parseISO(post.date), "LLLL d, yyyy")}
            </Text>
          </Box>

          <Divider mt="60px" />

          <HStack py="24px">
            <Avatar
              size="md"
              name={post.author.name}
              src={post.author.image_url}
            />
            <Box mt="8px">
              <Text fontWeight="semibold">{post.author.name}</Text>
              <Text color="whiteAlpha.600">{post.author.title}</Text>
            </Box>
          </HStack>

          <Divider mb="60px" />

          <Box className="post" color="whiteAlpha.700">
            <Component />
          </Box>

          <HStack spacing={2} mt={8}>
            {post.tags.map((tag) => (
              <Tag key={tag} variant="solid" bg="whiteAlpha.300">
                {tag}
              </Tag>
            ))}
          </HStack>

          <Divider my={10} />

          <SimpleGrid columns={2} spacing={10}>
            <Box p={6} bg="#333">
              {prevPost && (
                <NextLink href={`/blog/${prevPost.slug}`}>
                  <Box as="a" textAlign="left">
                    <Text color="whiteAlpha.600">Older Post:</Text>
                    <Text>{prevPost.title}</Text>
                  </Box>
                </NextLink>
              )}
            </Box>
            <Box p={6} bg="#333">
              {nextPost && (
                <NextLink href={`/blog/${nextPost.slug}`}>
                  <Box as="a" textAlign="right">
                    <Text color="whiteAlpha.600">Newer Post:</Text>
                    <Text>{nextPost.title}</Text>
                  </Box>
                </NextLink>
              )}
            </Box>
          </SimpleGrid>

          <style global jsx>{`
            .post {
              line-height: 1.6;
            }

            .post > * {
              margin-bottom: 1.25rem;
            }

            .post a {
              color: #00e9a3;
              text-decoration: underline;
            }

            .post img {
              max-width: 100%;
              display: block;
              margin: 0 auto;
            }

            .post ul,
            .post ol {
              padding-left: 2rem;
            }

            .post :not(pre) > code {
              font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono",
                monospace;
              font-size: 0.9em;
              white-space: pre;
              word-spacing: normal;
              word-break: normal;
              word-wrap: normal;
              background: #444;
              padding: 0.1em 0.3em;
              border-radius: 0.4rem;
            }

            .post h2,
            .post h3,
            .post h4,
            .post h5 {
              color: white;
              font-weight: bold;
              line-height: 1.4;
            }

            .post > * + h2,
            .post > * + h3 {
              margin-top: 3rem;
            }

            .post > h2 {
              font-size: 2rem;
            }

            .post > h3 {
              font-size: 1.6rem;
            }

            .post > h4 {
              font-size: 1.2rem;
            }
          `}</style>
        </Container>
      </Box>
    </>
  );
}
