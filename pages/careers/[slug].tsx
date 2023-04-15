import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { allJobs } from "contentlayer/generated";

export async function getStaticPaths() {
  const paths = allJobs.map((job) => ({ params: { slug: job.slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const job = allJobs.find((job) => job.slug === params.slug);

  return {
    props: {
      job,
    },
  };
}

export default function CareerDetailPage({ job }) {
  return (
    <>
      <Head>
        <title>Careers - Upstash</title>
      </Head>

      <Box as="section" py={["100px", "120px"]} textAlign="center">
        <Container maxW="3xl">
          <Heading as="h1" fontWeight="extrabold" size="3xl">
            {job.title}
          </Heading>

          <Stack
            direction={["column", "row"]}
            justify="center"
            spacing={[1, 6]}
            mt={6}
            color="whiteAlpha.600"
          >
            <Text>
              Experience:{" "}
              <Text as="span" color="white">
                {job.experience}
              </Text>
            </Text>
            <Text>
              Job type:{" "}
              <Text as="span" color="white">
                {job.how}
              </Text>
            </Text>
            <Text>
              Location:{" "}
              <Text as="span" color="white">
                {job.location}
              </Text>
            </Text>
          </Stack>

          <Flex mt={4} flexWrap="wrap" justify="center" gap={2}>
            {job.skills.map((skill) => (
              <Tag key={skill} variant="solid" bg="whiteAlpha.300">
                {skill}
              </Tag>
            ))}
          </Flex>

          <Button
            as="a"
            href="mailto:jobs@upstash.com"
            mt={8}
            color="black"
            bg="primary"
            _hover={{
              textDecoration: "none",
            }}
          >
            Apply now
          </Button>

          <Box
            mt={20}
            textAlign="left"
            className="post"
            dangerouslySetInnerHTML={{ __html: job.body.html }}
          />

          <style global jsx>{`
            .post > * {
              margin-bottom: 1rem;
            }
            .post > ul,
            .post > ol {
              padding-left: 2rem;
            }

            .post > h3,
            .post > h4,
            .post > h5 {
              font-weight: bold;
            }

            .post > h3 {
              font-size: 1.6rem;
            }

            .post > * + h3 {
              margin-top: 3rem;
            }

            .post > h4 {
              font-size: 1.2rem;
            }

            .post a {
              color: #00e9a3;
            }
          `}</style>
        </Container>
      </Box>
    </>
  );
}
