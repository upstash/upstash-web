import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useClipboard,
  useToast
} from '@chakra-ui/react'
import { codeGernerator, HIGHLIGHT_THEME, SUPPORT_LANG } from '../../constants'
import SyntaxHighlighter from 'react-syntax-highlighter'
import * as Icon from '../icons'
import Window from './window'
import WindowHeader from './window-header'

function Step2() {
  const toast = useToast()

  // clipboard
  const [text, textSet] = useState('')
  const { onCopy } = useClipboard(text)

  // lang
  const initialLang = SUPPORT_LANG.NODE_REDIS
  const [name, nameSet] = useState(initialLang.name)
  const [language, languageSet] = useState(initialLang.language)
  const code = codeGernerator(name)

  const onChange = (name, language) => {
    nameSet(name)
    languageSet(language)
  }

  useEffect(() => {
    if (text === '') return
    onCopy()
    toast({
      status: 'success',
      title: 'Copied!',
      position: 'top',

      duration: 1500
    })
  }, [text])

  return (
    <Window>
      <WindowHeader>
        <Box ml={4} pt="6px">
          <Menu>
            <MenuButton
              as={Button}
              h="34px"
              borderBottomLeftRadius="0"
              borderBottomRightRadius="0"
              bg="blackAlpha.500"
              fontSize="sm"
            >
              {initialLang.name}
            </MenuButton>
            <MenuList>
              {Object.keys(SUPPORT_LANG).map((lang) => {
                const SELECTED_LANG = SUPPORT_LANG[lang]
                return (
                  <MenuItem
                    key={lang}
                    onClick={() =>
                      onChange(SELECTED_LANG.name, SELECTED_LANG.language)
                    }
                  >
                    {SELECTED_LANG.name}
                  </MenuItem>
                )
              })}
            </MenuList>
          </Menu>
        </Box>
      </WindowHeader>

      <Box
        width="full"
        px={3}
        py={4}
        pos="relative"
        overflow="hidden"
        borderRadius="2xl"
      >
        {/* copy button */}
        <Button
          pos="absolute"
          right={2}
          top={2}
          size="xs"
          onClick={() => textSet(code)}
        >
          <Box as={Icon.Copy} mr={2} />
          Copy
        </Button>

        {/* code */}
        <SyntaxHighlighter
          language={language}
          showLineNumbers
          lineNumberStyle={{
            color: '#555'
          }}
          style={HIGHLIGHT_THEME}
        >
          {code}
        </SyntaxHighlighter>
      </Box>
    </Window>
  )
}

export default Step2
