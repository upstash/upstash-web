import React from "react";
import { useWindowSize } from "react-use";
import ReactConfetti, { Props } from "react-confetti";

const Confetti = React.forwardRef((passedProps: Props, ref) => {
  const { width, height } = useWindowSize();

  return (
    <ReactConfetti
      // bug: screen-width - scrollbar-width
      width={width - 50}
      height={height}
      {...passedProps}
      // @ts-ignore
      ref={ref}
    />
  );
});

Confetti.displayName = "Confetti";
export default Confetti;
