import SyntaxHighlighter from 'react-syntax-highlighter'
import { codeGernerator, HIGHLIGHT_THEME } from '../../constants'

export default function Editor({ name, language }) {
  return (
    <SyntaxHighlighter
      language={language}
      showLineNumbers
      lineNumberStyle={{
        color: '#444'
      }}
      style={HIGHLIGHT_THEME}
    >
      {codeGernerator(name)}
    </SyntaxHighlighter>
  )
}
