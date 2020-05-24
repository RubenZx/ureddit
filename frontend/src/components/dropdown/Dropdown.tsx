/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Divider, Row, User } from '@zeit-ui/react'
import {
  LogOut,
  Moon,
  Settings,
  Sun,
  User as UserIcon,
} from '@zeit-ui/react-icons'
import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { CSSTransition } from 'react-transition-group'
import NotAvatarBlack from '../../assets/notavatarblack.png'
import NotAvatarWhite from '../../assets/notavatarwhite.png'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { useAuth } from '../../services/Auth'
import { useTheme } from '../ThemeContext'
import './dropdown.css'
import DropdownItem from './DropdownItem'

const Dropdown = () => {
  const [height, setHeight] = useState<number | undefined>(undefined)
  const [open, setOpen] = useState(false)

  const ref = useRef(null)
  const onEnter = useCallback((node: HTMLElement) => {
    const height = node.offsetHeight
    setHeight(height)
  }, [])
  const navigate = useNavigate()
  const { themeType, switchTheme, palette } = useTheme()
  const { logout, user } = useAuth()

  useOutsideClick(ref, () => setOpen(false))

  return (
    <Row justify="center">
      <User
        className="menu"
        src={
          user?.avatar
            ? '/images/' + user?.avatar
            : themeType === 'dark'
            ? NotAvatarBlack
            : NotAvatarWhite
        }
        name=""
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div
          ref={ref}
          css={css`
            background: ${palette.background};
            height: ${height};
            position: absolute;
            top: 50px;
            width: 200px;
            transform: translatex(-45%);
            border: 1px solid ${palette.border};
            border-radius: 5px;
            padding: 0.5rem;
            overflow: hidden;
            transition: height 300ms ease;
            z-index: 1000;
          `}
        >
          <CSSTransition in unmountOnExit timeout={500} onEnter={onEnter}>
            <div style={{ width: '100%' }}>
              <DropdownItem
                leftIcon={<UserIcon />}
                onClick={() => navigate('u/' + user?.username)}
              >
                My profile
              </DropdownItem>
              <DropdownItem
                leftIcon={<Settings />}
                onClick={() => navigate('settings')}
              >
                Edit profile
              </DropdownItem>
              {themeType === 'light' ? (
                <DropdownItem leftIcon={<Moon />} onClick={switchTheme}>
                  Dark
                </DropdownItem>
              ) : (
                <DropdownItem leftIcon={<Sun />} onClick={switchTheme}>
                  Light
                </DropdownItem>
              )}

              <Divider y={0} />
              <DropdownItem leftIcon={<LogOut />} onClick={logout}>
                Log out
              </DropdownItem>
            </div>
          </CSSTransition>
        </div>
      )}
    </Row>
  )
}

export default Dropdown
