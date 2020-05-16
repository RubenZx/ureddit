import { Card, Col, Image, Link, Row, Text } from '@zeit-ui/react'
import { ArrowDown, ArrowUp, MessageSquare, Share } from '@zeit-ui/react-icons'
import React from 'react'
import { useNavigate } from 'react-router'
import IconButton from '../buttons/IconButton'

export interface PostType {
  author: string
  image: string
  title: string
  description: string
  likes: number
  created_at: Date
  updated_at: Date
}

export default ({
  author,
  image,
  title,
  description,
  likes,
  created_at,
  updated_at,
}: PostType) => {
  const navigate = useNavigate()
  return (
    <Row justify="center" style={{ marginTop: '20px' }}>
      <Card style={{ maxWidth: '600pt' }}>
        <Row>
          <Col span={1} style={{ marginRight: '20px' }}>
            <IconButton
              icon={ArrowUp}
              onClick={(event) => event.preventDefault()}
            />

            <Row justify="center">{likes}</Row>
            <IconButton
              icon={ArrowDown}
              onClick={(event) => event.preventDefault()}
            />
          </Col>
          <Col>
            <Text small>
              Posted by{' '}
              <Link color onClick={() => navigate('/u/' + author)}>
                u/{author}
              </Link>{' '}
              {created_at.toISOString().slice(0, 10)}
            </Text>
            <Text h4 style={{ margin: '0.5rem 0rem 1rem' }}>
              {title}
            </Text>
            <Image width={300} src={image} />
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
