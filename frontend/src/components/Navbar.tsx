import { Button, Col, Divider, Input, Link, Row, Spacer } from '@zeit-ui/react'
import * as Icon from '@zeit-ui/react-icons'
import React from 'react'
import Logo from '../assets/logo.png'

export default () => {
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
          <Link href="#" pure>
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
            <Button size="small" type="success" ghost effect={false}>
              Login
            </Button>
            <Spacer x={0.5} inline />
            <Button type="success" size="small" effect={false}>
              Sign up
            </Button>
          </Row>
        </Col>
      </Row>
      <Divider y={0} />
    </>
  )
}
