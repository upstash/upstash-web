import styles from './step-2.module.css'
// import { useContext } from 'react'
// import StoreContext from '../../store'
import SyntaxHighlighter from 'react-syntax-highlighter'
// import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { HIGHLIGHT_THEME } from '../../constants'

const Component = () => {
  // const store = useContext(StoreContext)

  const codeString = `const redis = require("redis");

var client = redis.createClient ({
  host : 'DATABASE-ENDPOINT',
  port : 'DATABASE-PORT',
  password: 'DATABASE-PASSWORD'
});

client.on("error", function(err) {
  throw err;
});

client.set('foo','bar');`

  return (
    <SyntaxHighlighter
      language="javascript"
      showLineNumbers
      lineNumberStyle={{
        color: '#555'
      }}
      style={HIGHLIGHT_THEME}
    >
      {codeString}
    </SyntaxHighlighter>
  )
}

function Step2() {
  return (
    <div className={styles.box}>
      <Component />
    </div>
  )
}

export default Step2
