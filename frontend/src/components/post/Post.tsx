import { Card, Col, Image, Link, Row, Spacer, Text } from '@zeit-ui/react'
import { ArrowDown, ArrowUp, MessageSquare, Share } from '@zeit-ui/react-icons'
import React from 'react'
import { useNavigate } from 'react-router'
import { Post } from '../../services/types'
import IconButton from '../buttons/IconButton'

export default ({
  user,
  image,
  title,
  description,
  likes,
  created_at,
  updated_at,
}: Post) => {
  const navigate = useNavigate()
  const date = new Date(created_at)

  return (
    <Row justify="center" style={{ marginTop: '20px' }}>
      <Card style={{ maxWidth: '600pt' }}>
        <Row>
          <Col span={1} style={{ marginRight: '20px' }}>
            <IconButton
              icon={ArrowUp}
              onClick={(event) => event.preventDefault()}
              style={{ paddingRight: '0.5rem' }}
            />
            <Row justify="center">{likes}</Row>
            <IconButton
              icon={ArrowDown}
              onClick={(event) => event.preventDefault()}
              style={{ paddingRight: '0.5rem' }}
            />
          </Col>
          <Col>
            <Text small>
              Posted by{' '}
              <Link color onClick={() => navigate('/u/' + user.username)}>
                u/{user.username}
              </Link>{' '}
              {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
            </Text>
            <Text h4 style={{ margin: '0.5rem 0rem 1rem' }}>
              {title}
            </Text>
            <Image width={300} src={'/images/' + image} />
            <Text p style={{ marginTop: '1rem' }}>
              {description}
            </Text>
            <Row>
              <Col span={4}>
                <Row align="middle">
                  <MessageSquare size={18} />
                  <Link>
                    <Text small style={{ marginLeft: '5px' }}>
                      Comments
                    </Text>
                  </Link>
                </Row>
              </Col>
              <Spacer x={0.5} />
              <Col>
                <Row align="middle">
                  <Share size={18} />
                  <Link onClick={() => {}}>
                    <Text small style={{ marginLeft: '5px' }}>
                      Copy link
                    </Text>
                  </Link>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Row>
  )
}
