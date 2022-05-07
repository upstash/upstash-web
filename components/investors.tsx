import {
  Container,
  Box,
  Avatar,
  Text,
  Wrap,
  Link,
  WrapItem,
  Heading,
} from "@chakra-ui/react";
import { INVESTORS } from "constants/";

function Investor({ name, title, src, url }) {
  return (
    <Box>
      <Link href={url} isExternal tabIndex={-1}>
        <Avatar name={name} src={src} size="lg" />
      </Link>

      <Heading as="h5" size="md" mt={4}>
        <Link href={url} isExternal>
          {name}
        </Link>
      </Heading>
      <Text mt={1} color="whiteAlpha.600">
        {title}
      </Text>
    </Box>
  );
}

function Investors({ fullList = false, ...props }) {
  const DATA = fullList ? INVESTORS : INVESTORS.slice(0, 5);

  return (
    <Container maxW="5xl">
      {/**/}

      <Box as="header">
        <Heading as="h2" size="2xl">
          Our investors
        </Heading>
        <Container maxW="3xl">
          <Text fontSize={["md", "xl"]} color="whiteAlpha.600" mt={3}>
            We are fortunate to work with some of the best investors in the
            world. Chances are you are already using the products they helped to
            create.
          </Text>
        </Container>
      </Box>

      <Wrap spacing="40px" justify="center" mt={20}>
        {DATA.map((investor) => {
          return (
            <WrapItem
              key={investor.name}
              width={["calc(50% - 40px)", "calc(33% - 40px)"]}
              justifyContent="center"
            >
              <Investor
                name={investor.name}
                title={investor.title}
                src={investor.src}
                url={investor.url}
              />
            </WrapItem>
          );
        })}
      </Wrap>
    </Container>
  );
}

export default Investors;
