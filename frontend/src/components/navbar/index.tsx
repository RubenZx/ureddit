import { Col, Divider, Input, Link, Row, Spacer } from '@zeit-ui/react'
import * as Icon from '@zeit-ui/react-icons'
import React from 'react'
import Logo from '../../assets/logo.png'
import { LocalStorageService } from '../../services/LocalStorage'
import GeneralBar from './GeneralBar'
import LoggedBar from './LoggedBar'

const Navbar = () => {
  const logged = LocalStorageService.isUserLoggedIn

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
        <Col span={3}>
          <Link href="/">
            <Row justify="center" align="middle">
              <img width={32} src={Logo} alt="Logo" />
              <Spacer x={0.5} inline />
              uReddit
            </Row>
          </Link>
        </Col>
        <Col span={13}>
          <Row justify="center">
            <Input
              icon={<Icon.Search />}
              placeholder="Search..."
              width="100%"
            />
          </Row>
        </Col>
        <Col span={8}>{logged ? <LoggedBar /> : <GeneralBar />}</Col>
      </Row>
      <Divider y={0} />
    </>
  )
}

export default Navbar
