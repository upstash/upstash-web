import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allBlogs } from "contentlayer/generated";

export async function getStaticPaths() {
  const paths = allBlogs.map((doc) => ({ params: { slug: doc.slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = allBlogs.find((doc) => doc.slug === params.slug);

  return {
    props: {
      post,
    },
  };
}

export default function CareerDetailPage({ post }) {
  console.log(post);
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

          <style global jsx>{`
            .post > * {
              margin-bottom: 2rem;
            }

            .post a {
              color: #00e9a3;
              text-decoration: underline;
            }

            .post > ul,
            .post > ol {
              padding-left: 2rem;
            }

            pre::-webkit-scrollbar {
              display: none;
            }

            pre {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
            }

            .post > h2,
            .post > h3,
            .post > h4,
            .post > h5 {
              font-weight: bold;
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
