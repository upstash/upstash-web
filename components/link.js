import NextLink from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";

function Link({ href, isExternal = false, children, ...props }) {
  return (
    <NextLink href={href} passHref>
      <ChakraLink
        isExternal={isExternal}
        display="inline-flex"
        alignItems="center"
        color="primary"
        _hover={{
          color: "primary",
          textDecoration: "underline",
        }}
        {...props}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
}

export default Link;
