import { Box } from "@chakra-ui/react";
import { HIGHLIGHT_THEME } from "constants/index.js";
import WindowHeader from "../components/demo/window-header";
import SyntaxHighlighter from "react-syntax-highlighter";
import Window from "../components/demo/window";

function CodeBlock({ fileName, children }) {
  return (
    <Window>
      <WindowHeader>
        {fileName && (
          <Box ml={4} pt="8px">
            <Box
              borderTopLeftRadius="md"
              borderTopRightRadius="md"
              color="whiteAlpha.700"
              bg="blackAlpha.500"
              fontSize="sm"
              d="flex"
              alignItems="center"
              h="32px"
              px={4}
            >
              {fileName}
            </Box>
          </Box>
        )}
      </WindowHeader>

      <Box
        width="full"
        px={3}
        py={4}
        pos="relative"
        overflow="hidden"
        borderRadius="2xl"
      >
        <SyntaxHighlighter
          language="javascript"
          showLineNumbers
          lineNumberStyle={{
            color: "#555",
          }}
          style={HIGHLIGHT_THEME}
        >
          {children}
        </SyntaxHighlighter>
      </Box>
    </Window>
  );
}

export default CodeBlock;
