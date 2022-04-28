import { useDeferredValue, useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Bg from "components/bg";
import Section from "components/section";
import PostCard from "components/post-card";
import SvgSearch from "components/icons/Search";
import { compareDesc } from "date-fns";
import { allBlogs } from "contentlayer/generated";

export async function getStaticProps() {
  const posts = allBlogs
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    })
    .slice(0, 10);

  return { props: { posts } };
}

export default function CareerPage({ posts }) {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search, { timeoutMs: 2000 });

  useEffect(() => {
    console.log(deferredSearch);
  }, [deferredSearch]);

  return (
    <>
      <Head>
        <title>Blog - Upstash</title>
      </Head>

      <Box as="section" py={["80px", "100px"]} textAlign="center">
        <Container maxW="3xl">
          <Heading as="h1" fontWeight="extrabold" size="3xl">
            Blog
          </Heading>

          <Box mt="24px" fontSize={["md", "2xl"]} color="whiteAlpha.700">
            <Text>Blog posts from the Upstash team and community.</Text>
            <Text>Discover the latest in web development.</Text>
          </Box>

          <Flex align="center" justify="center" mt="24px">
            <InputGroup maxW={320}>
              <InputLeftElement
                pointerEvents="none"
                children={<Box as={SvgSearch} color="whiteAlpha.400" />}
              />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </InputGroup>

            <Box ml="24px">
              <Menu closeOnSelect={false}>
                <MenuButton as={Button}>Filter by Tag</MenuButton>
                <MenuList minWidth="240px">
                  <MenuOptionGroup
                    defaultValue="asc"
                    title="Order"
                    type="radio"
                  >
                    <MenuItemOption value="asc">Ascending</MenuItemOption>
                    <MenuItemOption value="desc">Descending</MenuItemOption>
                  </MenuOptionGroup>
                  <MenuDivider />
                  <MenuOptionGroup defaultValue="asc" title="Tag" type="radio">
                    <MenuItemOption value="asc">Ascending</MenuItemOption>
                    <MenuItemOption value="desc">Descending</MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Section py={["100px", "140px"]}>
        <Bg />
        <Container maxW="5xl">
          <SimpleGrid columns={2} spacing="24px">
            {posts.map((post) => {
              return <PostCard key={post.slug} {...post} />;
            })}
          </SimpleGrid>
        </Container>
      </Section>
    </>
  );
}
