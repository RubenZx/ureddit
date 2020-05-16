import { Button, Row } from '@zeit-ui/react'
import { Icon } from '@zeit-ui/react-icons'
import React from 'react'

interface IconButtonProps {
  icon: Icon
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default ({ icon, onClick }: IconButtonProps) => (
  <Row align="middle" justify="center">
    <Button
      auto
      type="abort"
      icon={React.createElement(icon)}
      onClick={onClick}
      style={{ paddingLeft: '0.5rem' }}
    />
  </Row>
)
