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
  Link
} from '@chakra-ui/react'
import CustomLink from './custom-link'
import Logo from './logo'
import { LINKS, SOCIAL_LINKS } from '../constants'
import { useContext } from 'react'
import StoreContext from '../store'

function MobileMenu({ isOpen, onClose }) {
  const store = useContext(StoreContext)

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
              href={store.dbUrl}
              color="black"
              bg="primary"
              size="lg"
            >
              Console
            </Button>

            <VStack divider={<StackDivider />} align="stretch" color="white">
              <CustomLink isExternal href={LINKS.docs} h={10} color="inherit">
                <Flex grow={1}>Docs</Flex>
              </CustomLink>
              <CustomLink
                isExternal
                href={SOCIAL_LINKS.medium}
                h={10}
                color="inherit"
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
