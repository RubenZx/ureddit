/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import { useTheme } from '../ThemeContext'
import './dropdown.css'

interface DropdownItemProps {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClick?: () => void
}

const DropdownItem: React.FC<DropdownItemProps> = ({ children, ...props }) => {
  const { palette, themeType } = useTheme()

  return (
    <div
      onClick={props.onClick}
      css={css`
        &:hover {
          background-color: ${themeType === 'light'
            ? palette.accents_2
            : palette.accents_4};
        }
      `}
      className="dropdown-item"
    >
      <span style={{ marginRight: '0.5rem' }}>{props.leftIcon}</span>
      {children}
      <span style={{ marginLeft: 'auto' }}>{props.rightIcon}</span>
    </div>
  )
}

export default DropdownItem
