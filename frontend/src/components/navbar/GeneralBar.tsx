import { Row, Spacer } from '@zeit-ui/react'
import React, { useState } from 'react'
import MyButton from '../buttons/MyButton'
import MyModal from '../modal/MyModal'

export type modalTypes = 'login' | 'register' | 'forgotPassword'

export default () => {
  const [visible, setVisible] = useState(false)
  const [modalType, setModalType] = useState<modalTypes>('login')
  return (
    <>
      <Row justify="end">
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
