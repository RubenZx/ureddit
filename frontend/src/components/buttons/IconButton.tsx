import { Button, Row } from '@zeit-ui/react'
import { Icon } from '@zeit-ui/react-icons'
import React from 'react'

interface IconButtonProps {
  icon: Icon
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  style?: React.CSSProperties
}

export default ({ icon, onClick, style }: IconButtonProps) => (
  <Row align="middle" justify="center">
    <Button
      auto
      type="abort"
      icon={React.createElement(icon)}
      onClick={onClick}
      style={style}
    />
  </Row>
)
