import { Card, Col, Input, Row, Spacer } from '@zeit-ui/react'
import { User } from '@zeit-ui/react-icons'
import React from 'react'
import { useNavigate } from 'react-router'
import Post, { PostType } from './Post'
import PostsNotFound from './PostsNotFound'

const data: PostType[] = [
  {
    author: 'Rubenzx',
    image: '/images/php.jpg',
    title: 'Lets use another language',
    description: 'Because i think php sucks',
    likes: 100,
    created_at: new Date(),
    updated_at: new Date(),
  },
]

export default () => {
  const navigate = useNavigate()
  return (
    <Row style={{ marginTop: '20px' }}>
      <Col>
        <Row justify="center">
          <Card style={{ maxWidth: '600pt' }}>
            <Row align="middle">
              <User />
              <Spacer x={1} />
              <Input
                placeholder="Create a post..."
                width="100%"
                onClick={() => navigate('/submit')}
              />
            </Row>
          </Card>
        </Row>
        {data.length > 0 ? data.map((p) => <Post {...p} />) : <PostsNotFound />}
      </Col>
    </Row>
  )
}
