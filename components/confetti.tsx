import React from "react";
import { useWindowSize } from "react-use";
import ReactConfetti, { Props } from "react-confetti";

export default React.forwardRef((passedProps: Props, ref) => {
  const { width, height } = useWindowSize();

  return (
    // @ts-ignore
    <ReactConfetti width={width} height={height} {...passedProps} ref={ref} />
  );
});
