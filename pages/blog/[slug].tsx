import Head from "next/head";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allPosts } from "contentlayer/generated";
import type { Post } from "contentlayer/generated";
import { toLower } from "lodash";
import { compareDesc, format, parseISO } from "date-fns";
import { debounce } from "lodash";
import NextLink from "next/link";
import Section from "components/section";
import Bg from "components/bg";
import OtherPostCard from "components/other-post-card";
import PostNote from "components/post-note";
import useFetch from "use-http";
import React from "react";
import { MAX_CLAP } from "constants/index";
import dynamic from "next/dynamic";

const Confetti = dynamic(() => import("components/confetti"), {
  ssr: false,
});

export async function getStaticPaths() {
  const paths = allPosts.map((doc: Post) => ({ params: { slug: doc.slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts: Post[] = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

  const indexOfPost = posts.findIndex(
    (doc) => toLower(doc.slug) === toLower(params.slug)
  );

  if (indexOfPost < 0) {
    return {
      redirect: {
        destination: "/404",
      },
    };
  }

  const post = posts[indexOfPost];
  const nextPost = indexOfPost > 0 ? posts[indexOfPost - 1] : null;
  const prevPost =
    indexOfPost < posts.length - 1 ? posts[indexOfPost + 1] : null;

  return {
    props: {
      post,
      prevPost: prevPost
        ? { title: prevPost.title, slug: prevPost.slug }
        : null,
      nextPost: nextPost
        ? { title: nextPost.title, slug: nextPost.slug }
        : null,
    },
  };
}

export default function BlogPostPage({
  post,
  prevPost,
  nextPost,
}: {
  post: Post;
  prevPost?: Post;
  nextPost?: Post;
}) {
  const Component = useMDXComponent(post.body.code);

  const description =
    post.description ||
    "Articles and tutorials on serverless technologies from Upstash team and community";

  const [count, setCount] = React.useState(0);
  const [party, setParty] = React.useState(false);
  const [cacheCount, setCacheCount] = React.useState(0);

  const {
    get: getClaps,
    patch: updateClaps,
    response: responseClaps,
  } = useFetch(`post/clap/${post.slug}`);

  const onClapSaving = React.useCallback(
    debounce(async (count) => {
      const data = await updateClaps({ count });
      setCacheCount(0);
      if (!responseClaps.ok) return;
      setCount(data.count);
    }, 1000),
    []
  );

  const onClap = () => {
    const value = cacheCount === MAX_CLAP ? cacheCount : cacheCount + 1;
    setCacheCount(value);
    return onClapSaving(value);
  };

  const fetchClaps = async () => {
    const data = await getClaps();
    if (!responseClaps.ok) return;
    setCount(data.count);
  };

  const checkAnnounce = async () => {
    const hasAnnounced = post.tags.find((o) => o === "announce");

    if (!hasAnnounced) return;

    setParty(true);

    setTimeout(() => {
      setParty(false);
    }, 4000);
  };

  React.useEffect(() => {
    fetchClaps();
    checkAnnounce();
  }, []);

  return (
    <>
      <Head>
        <title>{post.title} | Upstash Blog</title>
        <meta name="description" content={description} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.authorObj.url} />
        <meta property="article:tag" content={post.tags.join(",")} />

        <link key="canonical" rel="canonical" href={post.url} />
        <link rel="alternate" href={post.url} hrefLang="en" />
        <link rel="alternate" href={post.url} hrefLang="x-default" />

        {/* facebook */}
        <meta key="og:type" property="og:type" content="article" />
        <meta key="og:url" property="og:url" content={post.url} />
        <meta key="og:title" property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta
          key="og:image"
          property="og:image"
          content={post.image || post.metaImage}
        />

        {/* twitter */}
        <meta key="twitter:url" name="twitter:url" content={post.url} />
        <meta key="twitter:title" name="twitter:title" content={post.title} />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={description}
        />
        <meta
          key="twitter:image"
          name="twitter:image"
          content={post.image || post.metaImage}
        />
      </Head>

      {/* Post Header */}

      <Confetti
        numberOfPieces={party ? 500 : 0}
        recycle={false}
        style={{ pointerEvents: "none" }}
      />

      <Box as="header" pt={["80px", "100px"]} textAlign="center">
        <Container maxW="4xl">
          <HStack justify="center" color="whiteAlpha.600">
            <Text as="time" dateTime={post.date}>
              {format(parseISO(post.date), "LLLL d, yyyy")}
            </Text>
            <Text>·</Text>
            <Text as="span">{post.readingTime.text}</Text>
            {/*<Text>·</Text>*/}
            {/*<Text as="span">{commaNumber(viewData.count)} views</Text>*/}
          </HStack>

          <Heading
            as="h1"
            mt={2}
            fontWeight="bold"
            size="2xl"
            lineHeight="shorter"
            letterSpacing="tight"
          >
            {post.title}
          </Heading>

          <Box mt={8}>
            <Avatar
              size="md"
              name={post.authorObj.name}
              src={post.authorObj.image_url}
            />
            <Box mt={4}>
              <NextLink href={`/blog/author/${post.author}`} passHref>
                <Text as="a" fontWeight="semibold">
                  {post.authorObj.name}
                </Text>
              </NextLink>
              <Text color="whiteAlpha.600">{post.authorObj.title}</Text>
            </Box>
          </Box>
        </Container>
      </Box>

      {post.headings.length > 0 && (
        <Box
          className="post-headings"
          display={["none", "none", "none", "block"]}
        >
          {post.headings.map((heading) => {
            return (
              <HStack
                as="a"
                key={heading.slug}
                href={`#${heading.slug}`}
                className={`post-headings-link h${heading.level}`}
              >
                <Box className="post-headings-link-dot" />
                <Box className="post-headings-link-text">{heading.title}</Box>
              </HStack>
            );
          })}
        </Box>
      )}

      <Section mt="60px" pt={["80px", "100px"]} textAlign="left">
        <Bg />

        <Container maxW="3xl">
          {/* Post Body */}

          <Box className="post" color="whiteAlpha.900">
            <Component
              components={{
                FullWidth: (props) => {
                  return <Box mx={{ xl: -40 }} {...props} />;
                },
                Note: (props) => {
                  return <PostNote {...props} />;
                },
              }}
            />
          </Box>

          {/* Post Tags */}

          <HStack spacing={2}>
            {post.tags.map((tag) => (
              <NextLink key={tag} href={`/blog/tag/${tag}`}>
                <a>
                  <Tag variant="subtle" colorScheme="gray">
                    {tag}
                  </Tag>
                </a>
              </NextLink>
            ))}
          </HStack>

          {/* Post Claps */}
          <Box zIndex={99} position="fixed" left={6} bottom={6}>
            <Button
              borderRadius="full"
              color="black"
              bgColor="primary"
              fontWeight="normal"
              transform={`scale(${cacheCount * 0.03 + 1})`}
              transformOrigin="left bottom"
              fontSize="sm"
              _hover={{}}
              _active={{}}
              onClick={onClap}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" aria-label="clap">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.37.83L12 3.28l.63-2.45h-1.26zM13.92 3.95l1.52-2.1-1.18-.4-.34 2.5zM8.59 1.84l1.52 2.11-.34-2.5-1.18.4zM18.52 18.92a4.23 4.23 0 0 1-2.62 1.33l.41-.37c2.39-2.4 2.86-4.95 1.4-7.63l-.91-1.6-.8-1.67c-.25-.56-.19-.98.21-1.29a.7.7 0 0 1 .55-.13c.28.05.54.23.72.5l2.37 4.16c.97 1.62 1.14 4.23-1.33 6.7zm-11-.44l-4.15-4.15a.83.83 0 0 1 1.17-1.17l2.16 2.16a.37.37 0 0 0 .51-.52l-2.15-2.16L3.6 11.2a.83.83 0 0 1 1.17-1.17l3.43 3.44a.36.36 0 0 0 .52 0 .36.36 0 0 0 0-.52L5.29 9.51l-.97-.97a.83.83 0 0 1 0-1.16.84.84 0 0 1 1.17 0l.97.97 3.44 3.43a.36.36 0 0 0 .51 0 .37.37 0 0 0 0-.52L6.98 7.83a.82.82 0 0 1-.18-.9.82.82 0 0 1 .76-.51c.22 0 .43.09.58.24l5.8 5.79a.37.37 0 0 0 .58-.42L13.4 9.67c-.26-.56-.2-.98.2-1.29a.7.7 0 0 1 .55-.13c.28.05.55.23.73.5l2.2 3.86c1.3 2.38.87 4.59-1.29 6.75a4.65 4.65 0 0 1-4.19 1.37 7.73 7.73 0 0 1-4.07-2.25zm3.23-12.5l2.12 2.11c-.41.5-.47 1.17-.13 1.9l.22.46-3.52-3.53a.81.81 0 0 1-.1-.36c0-.23.09-.43.24-.59a.85.85 0 0 1 1.17 0zm7.36 1.7a1.86 1.86 0 0 0-1.23-.84 1.44 1.44 0 0 0-1.12.27c-.3.24-.5.55-.58.89-.25-.25-.57-.4-.91-.47-.28-.04-.56 0-.82.1l-2.18-2.18a1.56 1.56 0 0 0-2.2 0c-.2.2-.33.44-.4.7a1.56 1.56 0 0 0-2.63.75 1.6 1.6 0 0 0-2.23-.04 1.56 1.56 0 0 0 0 2.2c-.24.1-.5.24-.72.45a1.56 1.56 0 0 0 0 2.2l.52.52a1.56 1.56 0 0 0-.75 2.61L7 19a8.46 8.46 0 0 0 4.48 2.45 5.18 5.18 0 0 0 3.36-.5 4.89 4.89 0 0 0 4.2-1.51c2.75-2.77 2.54-5.74 1.43-7.59L18.1 7.68z"
                />
              </svg>
              <Box as="span" ml={1}>
                {count}{" "}
                {cacheCount > 0 && (
                  <Box as="span" opacity=".6">
                    + {cacheCount}
                  </Box>
                )}
              </Box>
            </Button>
          </Box>

          {/* Post Share */}

          <Divider my={10} />

          <HStack spacing={4} justify="center">
            <Link
              isExternal
              href={`https://twitter.com/share?text=${post.title}&url=${post.url}`}
              aria-label="Share on Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 273.5 222.3"
                height="24"
              >
                <path
                  d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1"
                  fill="currentColor"
                ></path>
              </svg>
            </Link>
            <Link
              isExternal
              href={`https://www.facebook.com/sharer/sharer.php?u=${post.url}&t=${post.title}`}
              aria-label="Share on Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 15.3 15.4"
                height="24"
              >
                <path
                  d="M14.5 0H.8a.88.88 0 0 0-.8.9v13.6a.88.88 0 0 0 .8.9h7.3v-6h-2V7.1h2V5.4a2.87 2.87 0 0 1 2.5-3.1h.5a10.87 10.87 0 0 1 1.8.1v2.1h-1.3c-1 0-1.1.5-1.1 1.1v1.5h2.3l-.3 2.3h-2v5.9h3.9a.88.88 0 0 0 .9-.8V.8a.86.86 0 0 0-.8-.8z"
                  fill="currentColor"
                ></path>
              </svg>
            </Link>
            <Link
              isExternal
              href={`https://www.linkedin.com/shareArticle?url=${post.url}&title=${post.title}`}
              aria-label="Share on LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 19 18"
                height="24"
              >
                <path
                  d="M3.94 2A2 2 0 1 1 2 0a2 2 0 0 1 1.94 2zM4 5.48H0V18h4zm6.32 0H6.34V18h3.94v-6.57c0-3.66 4.77-4 4.77 0V18H19v-7.93c0-6.17-7.06-5.94-8.72-2.91z"
                  fill="currentColor"
                ></path>
              </svg>
            </Link>
          </HStack>

          <Divider my={10} />

          {/* Other Post */}

          <SimpleGrid columns={[1, 1, 2]} spacing={10}>
            <OtherPostCard post={prevPost} />
            <OtherPostCard post={nextPost} align="right" />
          </SimpleGrid>

          {/* Post Style */}

          <style global jsx>{`
            .post {
              line-height: 1.7;
            }

            .post > * {
              margin-bottom: 2rem;
            }

            .post > .rehype-code-title {
              margin-bottom: 0;
              padding: 0.5rem 1rem;
              border-radius: 0.5em 0.5em 0 0;
              font-size: 0.9rem;
              color: rgb(255 255 255 / 60%);
              border: 1px solid rgb(255 255 255 / 10%);
              border-bottom: 0;
              // background-color: rgb(255 255 255 / 5%);
            }

            .post .rehype-code-title + pre {
              border-top-left-radius: 0;
              border-top-right-radius: 0;
            }

            .post a {
              text-decoration: underline;
              text-decoration-color: rgb(255 255 255 / 40%);
            }

            .post table {
              display: block;
              width: 100%;
              width: max-content;
              max-width: 100%;
              overflow: auto;
            }

            .post table tr {
              border-top: 1px solid #333;
            }

            .post table th,
            .post table td {
              padding: 6px 13px;
              border: 1px solid #333;
            }

            .post table th {
              font-weight: semibold;
              white-space: nowrap;
            }

            .post table tr:nth-child(2n) {
              background-color: rgb(255 255 255 / 10%);
            }

            .post a.anchor:after {
              content: "#";
              color: rgb(255 255 255 / 50%);
            }

            .post a.anchor {
              visibility: hidden;
              position: absolute;
              -webkit-text-decoration-line: none;
              text-decoration-line: none;
              margin-left: -1em;
              padding-right: 0.5em;
              cursor: pointer;
            }

            .post :hover > .anchor {
              visibility: visible;
            }

            .post img {
              max-width: 100%;
              display: block;
              margin: 0 auto;
              border-radius: 0.5rem;
            }

            .post ul,
            .post ol {
              padding-left: 2rem;
            }

            .post :not(pre) > code {
              font-size: 0.86em;
              white-space: pre;
              word-spacing: normal;
              word-break: normal;
              word-wrap: normal;
              border: 1px solid rgb(255 255 255 / 20%);
              padding: 0.2em 0.3em;
              border-radius: 0.4rem;
            }

            .post :where(h2, h3, h4, h5) {
              scroll-margin-top: 2rem;
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
      </Section>
    </>
  );
}
