import Col from './col'

export default function ColDescription({ children, ...props }) {
  return (
    <Col
      justify="flex-start"
      textAlign="left"
      color="whiteAlpha.700"
      {...props}
    >
      {children}
    </Col>
  )
}
