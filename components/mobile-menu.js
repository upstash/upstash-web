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
  VStack
} from '@chakra-ui/react'
import CustomLink from './custom-link'
import Logo from './logo'

function MobileMenu({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={6}>
          {/**/}

          <Flex align="center">
            <Logo />
            <Spacer />
            <CloseButton size="lg" onClick={onClose} />
          </Flex>

          <VStack mt={5} spacing="24px" align="stretch">
            <Button
              size="lg"
              colorScheme="yellow"
              href="https://console.lambda.store"
            >
              Console
            </Button>

            <VStack divider={<StackDivider />} align="stretch">
              <CustomLink h={10} href="/">
                <Flex>Pricing</Flex>
              </CustomLink>
              <CustomLink h={10} isExternal href="https://docs.lambda.store/">
                <Flex grow={1}>Docs</Flex>
              </CustomLink>
              <CustomLink
                h={10}
                isExternal
                href="https://medium.com/lambda-store"
              >
                <Flex grow={1}>Blog</Flex>
              </CustomLink>
            </VStack>
          </VStack>

          {/**/}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default MobileMenu
