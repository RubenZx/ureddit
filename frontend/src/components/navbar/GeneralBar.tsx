import { Row, Spacer } from '@zeit-ui/react'
import { Moon, Sun } from '@zeit-ui/react-icons'
import React, { useState } from 'react'
import IconButton from '../buttons/IconButton'
import MyButton from '../buttons/MyButton'
import MyModal from '../modal/MyModal'
import { useTheme } from '../ThemeContext'

export type modalTypes = 'login' | 'register' | 'forgotPassword'

export default () => {
  const [visible, setVisible] = useState(false)
  const [modalType, setModalType] = useState<modalTypes>('login')
  const { themeType, switchTheme } = useTheme()
  return (
    <>
      <Row justify="end" align="middle">
        <MyButton
          onClick={() => {
            setModalType('login')
            setVisible(true)
          }}
          size="small"
          type="success"
          ghost
          shadow
        >
          Login
        </MyButton>

        <Spacer x={0.5} inline />
        <MyButton
          onClick={() => {
            setModalType('register')
            setVisible(true)
          }}
          type="success"
          size="small"
          shadow
        >
          Sign up
        </MyButton>
        <Spacer x={0.5} inline />
        {themeType === 'light' ? (
          <IconButton
            icon={Moon}
            onClick={switchTheme}
            style={{ paddingRight: '0.5rem' }}
          />
        ) : (
          <IconButton
            icon={Sun}
            onClick={switchTheme}
            style={{ paddingRight: '0.5rem' }}
          />
        )}
      </Row>
      <MyModal
        closeHandler={() => setVisible(false)}
        typeHandler={(type: modalTypes) => setModalType(type)}
        open={visible}
        type={modalType}
      />
    </>
  )
}
