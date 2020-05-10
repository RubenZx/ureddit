import { Col, Divider, Input, Link, Row, Spacer } from '@zeit-ui/react'
import * as Icon from '@zeit-ui/react-icons'
import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import MyModal from './modal/MyModal'
import MyButton from './MyButton'

export type modalTypes = 'login' | 'register' | 'forgotPassword'

export default () => {
  const [visible, setVisible] = useState(false)
  const [modalType, setModalType] = useState<modalTypes>('login')

  return (
    <>
      <Row
        align="middle"
        style={{
          margin: '0px auto',
          maxWidth: '782pt',
          padding: '10px 0px 10px',
        }}
      >
        <Col span={4}>
          <Link href="#">
            <Row align="middle">
              <img width={32} src={Logo} alt="Logo" />
              <Spacer x={0.5} inline />
              uReddit
            </Row>
          </Link>
        </Col>
        <Col span={11}>
          <Row justify="center">
            <Input
              icon={<Icon.Search />}
              placeholder="Search..."
              width="100%"
            />
          </Row>
        </Col>
        <Col span={9}>
          <Row justify="end">
            {/* LOGIN */}
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
        </Col>
      </Row>
      <MyModal
        closeHandler={() => setVisible(false)}
        typeHandler={(type: modalTypes) => setModalType(type)}
        open={visible}
        type={modalType}
      />
      <Divider y={0} />
    </>
  )
}
