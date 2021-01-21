import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  VStack,
  StackDivider
} from '@chakra-ui/react'

export default function FaqAccordionItem({ title, children }) {
  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <Box
            bgColor={isExpanded ? 'gray.700' : 'transparent'}
            borderRadius="2xl"
            p={0}
          >
            <AccordionButton px={6} pb={6} pt={isExpanded ? 8 : 6}>
              <Heading as="h4" size="md">
                {title}
              </Heading>
              <AccordionIcon fontSize={32} color="whiteAlpha.400" />
            </AccordionButton>

            <AccordionPanel pt={0} pb={8} px={8} color="gray.300">
              <VStack spacing={6}>{children}</VStack>
            </AccordionPanel>
          </Box>

          {!isExpanded && (
            <StackDivider w="50%" h="1px" mx="auto" bgColor="whiteAlpha.100" />
          )}
        </>
      )}
    </AccordionItem>
  )
}
