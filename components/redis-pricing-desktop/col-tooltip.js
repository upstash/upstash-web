import { Box, Tooltip } from '@chakra-ui/react'
import * as Icon from '../icons'

export default function CustomTooltip({ children }) {
  return (
    <Tooltip shouldWrapChildren placement="top" label={children}>
      <Box
        as={Icon.Info}
        ml={1}
        fontSize="xl"
        opacity={0.6}
        display="inline-flex"
      />
    </Tooltip>
  )
}
