import { useState, useEffect } from 'react'
import { Box, Button, useClipboard, useToast } from '@chakra-ui/react'
import { codeGernerator, HIGHLIGHT_THEME, SUPPORT_LANG } from '../../constants'
import SyntaxHighlighter from 'react-syntax-highlighter'
// import Tab from './tab'
import * as Icon from '../icons'

function Step2({ db }) {
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
    <Box>
      {/*<Tab name={name} onChange={onChange} />*/}

      <Box px={3} py={4} pos="relative" borderRadius="2xl">
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
    </Box>
  )
}

export default Step2
