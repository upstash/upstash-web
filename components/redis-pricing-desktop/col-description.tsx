import Col from "./col";
import React from "react";

export default function ColDescription({
  children,
  ...props
}: {
  children?: React.ReactNode;
}) {
  return (
    <Col
      justify="flex-start"
      textAlign="left"
      color="whiteAlpha.700"
      {...props}
    >
      {children}
    </Col>
  );
}
