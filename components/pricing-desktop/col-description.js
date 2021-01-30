import Col from './col'
import CustomTooltip from './col-tooltip'

export default function ColDescription({ children, tooltip, ...props }) {
  return (
    <Col
      justify="flex-start"
      textAlign="left"
      color="whiteAlpha.700"
      {...props}
    >
      {children}
      {tooltip && <CustomTooltip>{tooltip}</CustomTooltip>}
    </Col>
  )
}
