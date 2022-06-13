import { Container, SimpleGrid, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import commaNumber from "comma-number";

function CountCard({ value, title }) {
  return (
    <Box
      bgColor="white"
      color="gray.900"
      borderRadius={["xl", "2xl"]}
      py={5}
      textAlign="center"
      boxShadow="dark-lg"
    >
      <Text fontSize={["2xl", "3xl"]} fontWeight="semibold" lineHeight="1">
        {commaNumber(value)}
      </Text>
      <Text
        mt={2}
        color="gray.500"
        lineHeight="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          as="span"
          mr="2"
          ml="-2"
          display="inline-flex"
          boxSize="10px"
          bgColor="primary"
          borderRadius="full"
          css={{
            animation: "1s online infinite alternate",
          }}
        />{" "}
        {title}
      </Text>
    </Box>
  );
}

function SectionInfo() {
  const [data, setData] = useState({ database: 0, user: 0 });

  useEffect(() => {
    fetch("https://global-proven-finch-31564.upstash.io/hgetall/active_data", {
      headers: {
        Authorization:
          "Bearer AntMASQgYzc5YTMwMmQtMmE1Zi00NDI1LWE5ODctOTlhOTEzMWU1Mjc5_3NQlPMV3SNRmBYHfi62PIe4deMnaBqgQHDXFNL6G7I=",
      },
    })
      .then((response) => response.json())
      .then(({ result }) => {
        const data = { database: 0, user: 0 };
        for (let i = 0; i < result.length; i++) {
          data[result[i]] = result[i + 1];
          i++;
        }
        setData(data);
      });
  }, []);

  return (
    <Box as="section" my={["-120px", "-160px"]}>
      <Box
        bgImage="/assets/map.png"
        bgRepeat="no-repeat"
        bgPos={"center"}
        bgSize={["1400px auto", "1418px 686px"]}
      >
        <Box bg="linear-gradient(180deg, #050505 0%, rgba(5, 5, 5, 0) 41.67%, rgba(5, 5, 5, 0) 56.77%, #050505 100%)">
          <Box
            height={["700px"]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Container maxW="container.sm">
              <SimpleGrid columns={[1, 2]} spacing={8}>
                <CountCard value={data.user} title="Users" />
                <CountCard value={data.database} title="Databases" />
              </SimpleGrid>
            </Container>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SectionInfo;
