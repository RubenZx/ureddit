import { Col, Divider, Input, Link, Row, Spacer } from '@zeit-ui/react'
import * as Icon from '@zeit-ui/react-icons'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { useAuth } from '../../services/Auth'
import GeneralBar from './GeneralBar'
import LoggedBar from './LoggedBar'

const Navbar = () => {
  const [searchValue, setSearchValue] = useState('')

  const { isUserLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate('/search?q=' + searchValue)
  }

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
          <Link onClick={() => navigate('/')}>
            <Row justify="center" align="middle">
              <img width={32} src={Logo} alt="Logo" />
              <Spacer x={0.5} inline />
              uReddit
            </Row>
          </Link>
        </Col>
        <Col span={11}>
          <Row align="middle" justify="center">
            <Input
              icon={<Icon.Search />}
              placeholder="Search..."
              width="100%"
              value={searchValue}
              onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
            />
            <Spacer x={0.5} />
          </Row>
        </Col>
        <Col span={10}>{isUserLoggedIn ? <LoggedBar /> : <GeneralBar />}</Col>
      </Row>
      <Divider y={0} />
    </>
  )
}

export default Navbar
