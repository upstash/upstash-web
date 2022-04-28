import Head from "next/head";
import {
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allBlogs } from "contentlayer/generated";
import { compareDesc } from "date-fns";
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

      <Box as="section" py={["100px", "120px"]} textAlign="center">
        <Container maxW="3xl">
          <Heading
            as="h1"
            fontWeight="extrabold"
            size="2xl"
            lineHeight="normal"
          >
            {post.title}
          </Heading>

          <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
            {post.author.name}
            <br />
            {post.author.title}
            <br />
            <img
              width={50}
              src={post.author.image_url}
              alt={post.author.name}
            />
          </Box>

          <Box mt={20} textAlign="left" className="post">
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
                  <Box textAlign="left">
                    <Text color="whiteAlpha.600">Older Post:</Text>
                    <Text>{prevPost.title}</Text>
                  </Box>
                </NextLink>
              )}
            </Box>
            <Box p={6} bg="#333">
              {nextPost && (
                <NextLink href={`/blog/${nextPost.slug}`}>
                  <Box textAlign="right">
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
