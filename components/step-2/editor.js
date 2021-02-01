import SyntaxHighlighter from 'react-syntax-highlighter'
import { codeGernerator, HIGHLIGHT_THEME } from '../../constants'

export default function Editor({ db, name, language }) {
  const CODE = codeGernerator(name, db)

  return (
    <SyntaxHighlighter
      language={language}
      showLineNumbers
      lineNumberStyle={{
        color: '#444'
      }}
      style={HIGHLIGHT_THEME}
    >
      {CODE}
    </SyntaxHighlighter>
  )
}
