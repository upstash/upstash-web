import dynamic from "next/dynamic";
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { TableContainer } from "@chakra-ui/react";
import { Thead, Tbody, Tr, Th, Td, Table } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useFetch from "use-http";

const AnimatedGlobe = dynamic(() => import("components/globe"), {
  ssr: false,
});

function SpeedText({ loading, data }) {
  return loading ? (
    <Text color={"whiteAlpha.500"}>Loading...</Text>
  ) : data ? (
    <Text color={data > 10 ? "yellow.500" : "primary"}>
      {Math.round(data)}ms
    </Text>
  ) : (
    <>-</>
  );
}

export default function TestPage() {
  const urlUsEast1 =
    "https://effbmlt2n4.execute-api.us-east-1.amazonaws.com/dev/run";
  const urlUsWest1 =
    "https://kg2nsnegmd.execute-api.us-west-1.amazonaws.com/dev/run";
  const urlUsWest2 =
    "https://xsdlzzdyji.execute-api.us-west-2.amazonaws.com/dev/run";
  // const urlAfSouth1 =
  //   "https://up1j9vlh71.execute-api.af-south-1.amazonaws.com/dev/run";
  const urlApEast1 =
    "https://gu1zu8xx11.execute-api.ap-east-1.amazonaws.com/dev/run";
  // const urlApNorthEast1 =
  //   "https://c3iqabumtd.execute-api.ap-northeast-1.amazonaws.com/dev/run";
  const urlApSouthEast1 =
    "https://czphf8wj9b.execute-api.ap-southeast-1.amazonaws.com/dev/run";
  const urlEuWest1 =
    "https://fvj3rll99i.execute-api.eu-west-1.amazonaws.com/dev/run";
  const urlEuCentral1 =
    "https://bszkhcn2m7.execute-api.eu-central-1.amazonaws.com/dev/run";
  const urlMeSouth1 =
    "https://um7c15bqnl.execute-api.me-south-1.amazonaws.com/dev/run";
  const urlSaEast1 =
    "https://kuhry6kp4h.execute-api.sa-east-1.amazonaws.com/dev/run";

  const {
    data: usWest1,
    get: getUsWest1,
    loading: loadingUsWest1,
  } = useFetch(urlUsWest1);
  const {
    data: usWest2,
    get: getUsWest2,
    loading: loadingUsWest2,
  } = useFetch(urlUsWest2);
  const {
    data: usEast1,
    get: getUsEast1,
    loading: loadingUsEast1,
  } = useFetch(urlUsEast1);
  // const {
  //   data: afSouth1,
  //   get: getAfSouth1,
  //   loading: loadingAfSouth1,
  // } = useFetch(urlAfSouth1);
  const {
    data: apEast1,
    get: getApEast1,
    loading: loadingApEast1,
  } = useFetch(urlApEast1);
  // const {
  //   data: apNorthEast1,
  //   get: getApNorthEast1,
  //   loading: loadingApNorthEast1,
  // } = useFetch(urlApNorthEast1);
  const {
    data: apSouthEast1,
    get: getApSouthEast1,
    loading: loadingApSouthEast1,
  } = useFetch(urlApSouthEast1);
  const {
    data: euWest1,
    get: getEuWest1,
    loading: loadingEuWest1,
  } = useFetch(urlEuWest1);
  const {
    data: euCentral1,
    get: getEuCentral1,
    loading: loadingEuCentral1,
  } = useFetch(urlEuCentral1);
  const {
    data: meSouth1,
    get: getMeSouth1,
    loading: loadingMeSouth1,
  } = useFetch(urlMeSouth1);
  const {
    data: saEast1,
    get: getSaEast1,
    loading: loadingSaEast1,
  } = useFetch(urlSaEast1);

  const onRefresh = () => {
    getUsWest1();
    getUsWest2();
    getUsEast1();
    getSaEast1();
    // getAfSouth1();
    getApEast1();
    // getApNorthEast1();
    getApSouthEast1();
    getEuWest1();
    getEuCentral1();
    getMeSouth1();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <Box py={[20, "140px"]} pos="relative">
      <Container maxW="5xl" overflow="hidden">
        <Box width={["full", "42%"]} pos="relative" zIndex={1}>
          <Box as="header">
            <Heading
              as="h1"
              lineHeight="shorter"
              size="2xl"
              bgGradient="linear(to-r, #00e9a3, #d69e2e)"
              bgClip="text"
            >
              Fast Anywhere ⚡️
            </Heading>
            <Text
              mt={2}
              fontSize={["md", "2xl"]}
              fontWeight={"light"}
              color="whiteAlpha.700"
              lineHeight="short"
            >
              An AWS Lambda function from different regions reads from Upstash
              Redis* and records latency.
            </Text>
          </Box>

          <TableContainer mt={10}>
            <Table variant="simple" size="sm" colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th
                    paddingX={0}
                    borderColor="#222"
                    fontWeight="normal"
                    color="whiteAlpha.500"
                  >
                    Regions
                  </Th>
                  <Th
                    paddingX={0}
                    borderColor="#222"
                    fontWeight="normal"
                    color="whiteAlpha.500"
                    isNumeric
                  >
                    <Button
                      size="xs"
                      variant="ghost"
                      fontWeight="normal"
                      onClick={onRefresh}
                      px={1}
                      mr={0.5}
                      color="whiteAlpha.500"
                      _hover={{
                        color: "white",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                      </svg>
                    </Button>
                    <span>Read</span>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td paddingX={0} borderColor="#222">
                    US West (N. California)
                  </Td>
                  <Td paddingX={0} borderColor="#222" isNumeric>
                    <SpeedText
                      loading={loadingUsWest1}
                      data={usWest1?.latencyGlobal}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td paddingX={0} borderColor="#222">
                    US West (Oregon)
                  </Td>
                  <Td paddingX={0} borderColor="#222" isNumeric>
                    <SpeedText
                      loading={loadingUsWest2}
                      data={usWest2?.latencyGlobal}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td paddingX={0} borderColor="#222">
                    US East (N. Virginia)
                  </Td>
                  <Td paddingX={0} borderColor="#222" isNumeric>
                    <SpeedText
                      loading={loadingUsEast1}
                      data={usEast1?.latencyGlobal}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td paddingX={0} borderColor="#222">
                    South America (São Paulo)
                  </Td>
                  <Td paddingX={0} borderColor="#222" isNumeric>
                    <SpeedText
                      loading={loadingSaEast1}
                      data={saEast1?.latencyGlobal}
                    />
                  </Td>
                </Tr>
                {/*<Tr>
                  <Td paddingX={0} borderColor="#222">
                    Africa (Cape Town)
                  </Td>
                  <Td paddingX={0} borderColor="#222" isNumeric>
                    <SpeedText
                      loading={loadingAfSouth1}
                      data={afSouth1?.latencyGlobal}
                    />
                  </Td>
                </Tr>*/}
                <Tr>
                  <Td paddingX={0} borderColor="#222">
                    Asia Pacific (Hong Kong)
                  </Td>
                  <Td paddingX={0} borderColor="#222" isNumeric>
                    <SpeedText
                      loading={loadingApEast1}
                      data={apEast1?.latencyGlobal}
                    />
                  </Td>
                </Tr>
                {/*<Tr>
                  <Td paddingX={0} borderColor="#222">
                    Asia Pacific (Tokyo)
                  </Td>
                  <Td paddingX={0} borderColor="#222" isNumeric>
                    <SpeedText
                      loading={loadingApNorthEast1}
                      data={apNorthEast1?.latencyGlobal}
                    />
                  </Td>
                </Tr>*/}
                <Tr>
                  <Td paddingX={0} borderColor="#222">
                    Asia Pacific (Singapore)
                  </Td>
                  <Td paddingX={0} borderColor="#222" isNumeric>
                    <SpeedText
                      loading={loadingApSouthEast1}
                      data={apSouthEast1?.latencyGlobal}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td paddingX={0} borderColor="#222">
                    Europe (Ireland)
                  </Td>
                  <Td paddingX={0} borderColor="#222" isNumeric>
                    <SpeedText
                      loading={loadingEuWest1}
                      data={euWest1?.latencyGlobal}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td paddingX={0} borderColor="#222">
                    Europe (Frankfurt)
                  </Td>
                  <Td paddingX={0} borderColor="#222" isNumeric>
                    <SpeedText
                      loading={loadingEuCentral1}
                      data={euCentral1?.latencyGlobal}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td paddingX={0} borderColor="#222">
                    Middle East (Bahrain)
                  </Td>
                  <Td paddingX={0} borderColor="#222" isNumeric>
                    <SpeedText
                      loading={loadingMeSouth1}
                      data={meSouth1?.latencyGlobal}
                    />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        <Box
          display={["none", "block"]}
          zIndex={0}
          pos="absolute"
          left="50%"
          top="50%"
          transform="translate3d(-200px, -45%, 0)"
        >
          <AnimatedGlobe width={1400} height={1400} />
        </Box>
      </Container>
    </Box>
  );
}
