import { Box } from '@chakra-ui/react'

function Bg(props) {
  return (
    <Box
      zIndex={-1}
      pos="absolute"
      left={['calc(50% - 1200px / 2)', 'calc(50% - 3000px / 2)']}
      top={0}
      width={[1200, 3000]}
      h={[800, 1400]}
      background="linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 40%)"
      borderRadius="100%"
      {...props}
    />
  )
}

export default Bg
