import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalBody,
  StackDivider,
  Flex,
  CloseButton,
  Spacer,
  VStack,
  Link,
} from "@chakra-ui/react";
import CustomLink from "./custom-link";
import Logo from "./logo";
import { LINKS, SOCIAL_LINKS } from "constants/";

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay bg="whiteAlpha.200" />
      <ModalContent bg="black">
        <ModalBody p={6}>
          {/**/}

          <Flex align="center">
            <Logo />
            <Spacer />
            <CloseButton size="lg" onClick={onClose} />
          </Flex>

          <VStack mt={5} spacing="24px" align="stretch">
            <Button
              as={Link}
              href={LINKS.console}
              color="black"
              bg="primary"
              size="lg"
            >
              Console
            </Button>

            <VStack divider={<StackDivider />} align="stretch" color="white">
              <CustomLink href="/about" h={10} color="inherit">
                <Flex grow={1}>About</Flex>
              </CustomLink>
              <CustomLink href="/blog" h={10} color="inherit">
                <Flex grow={1}>Blog</Flex>
              </CustomLink>
              {/*<CustomLink href="/careers" h={10} color="inherit">
                <Flex grow={1} alignItems="center">
                  Careers
                  <Flex
                    alignItems="center"
                    justify="center"
                    ml={2}
                    px={1}
                    h={4}
                    minW={4}
                    borderRadius="full"
                    bg="primary"
                    color="black"
                    fontWeight="semibold"
                    fontSize="xs"
                  >
                    3
                  </Flex>
                </Flex>
              </CustomLink>*/}
              <CustomLink isExternal href={LINKS.docs} h={10} color="inherit">
                <Flex grow={1}>Docs</Flex>
              </CustomLink>
              <CustomLink
                isExternal
                href={SOCIAL_LINKS.discord}
                h={10}
                color="inherit"
              >
                <Flex grow={1}>Discord</Flex>
              </CustomLink>
            </VStack>
          </VStack>

          {/**/}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MobileMenu;
