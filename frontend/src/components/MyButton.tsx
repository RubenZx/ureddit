import { Button } from '@zeit-ui/react'
import { ButtonProps } from '@zeit-ui/react/dist/button/button'
import React from 'react'
import './button.css'

const MyButton: React.FC<Partial<ButtonProps>> = ({ children, ...props }) => (
  <Button className="my-button" {...props}>
    {children}
  </Button>
)

export default MyButton
