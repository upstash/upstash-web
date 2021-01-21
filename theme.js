import { extendTheme } from '@chakra-ui/react'
// import { mode } from '@chakra-ui/theme-tools'

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark'
}

const theme = extendTheme({
  styles: {
    global: {
      html: {
        fontSize: '17px'
      }
    }
  },
  sizes: {
    bubble: 40
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif'
  },
  colors: {},
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium'
      },
      sizes: {
        lg: {
          fontSize: 'md'
        }
      }
    },
    Container: {
      baseStyle: {
        px: [6, 8]
      }
    },
    Modal: {
      baseStyle: {
        dialogContainer: {
          p: '1rem'
        },
        dialog: {
          my: 0,
          borderRadius: '2xl'
        },
        closeButton: {
          right: 6,
          top: 4
        }
      }
    },
    Accordion: {
      baseStyle: {
        container: {
          borderTopWidth: 0,
          _last: {
            borderBottomWidth: 0
          }
        },
        button: {
          d: 'flex',
          justifyContent: 'center',
          _hover: {
            bg: 'transparent'
          },
          _focus: {
            boxShadow: 'none'
          }
        },
        panel: {}
      }
    }
  },
  config
})

export default theme
