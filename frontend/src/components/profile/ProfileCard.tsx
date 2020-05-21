import { Card, Col, Link, Row, Spacer, Text, User } from '@zeit-ui/react'
import { AtSign } from '@zeit-ui/react-icons'
import moment from 'moment'
import React from 'react'
import NotAvatarBlack from '../../assets/notavatarblack.png'
import NotAvatarWhite from '../../assets/notavatarwhite.png'
import { User as UserType } from '../../services/types'
import { useTheme } from '../ThemeContext'

export default ({ user }: { user?: UserType }) => {
  const { themeType, palette } = useTheme()
  return (
    <Row justify="center" style={{ marginTop: '20px' }}>
      {user && (
        <Card style={{ maxWidth: '600pt' }}>
          <Row>
            <User
              name={user.name}
              src={
                user.avatar
                  ? '/images/' + user.avatar
                  : themeType === 'dark'
                  ? NotAvatarBlack
                  : NotAvatarWhite
              }
            >
              <User.Link href={user.username}>u/{user.username}</User.Link>
            </User>
          </Row>
          <Row style={{ marginTop: '20px' }} align="bottom">
            <Col>
              <Row>
                <Text small>Joined</Text>
              </Row>
              <Text small>{moment(user.created_at).format('LL')}</Text>
            </Col>
            <Col>
              <Row>
                <Text small>Email</Text>
              </Row>
              <Link underline href={`mailto:${user.email}`}>
                <Row align="middle">
                  <AtSign size={16} color={palette.success} />
                  <Spacer x={0.25} />
                  <Text small>{user.email}</Text>
                </Row>
              </Link>
            </Col>
          </Row>
        </Card>
      )}
    </Row>
  )
}
