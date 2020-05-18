import { Card, Col, Input, Loading, Row, Spacer } from '@zeit-ui/react'
import { User } from '@zeit-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getPosts } from '../../services/api'
import { LocalStorageService } from '../../services/LocalStorage'
import Post from './Post'

export default () => {
  const [posts, setPosts] = useState<any[]>()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      setPosts(await getPosts())
    })()
  }, [])

  return (
    <Row style={{ marginTop: '20px' }}>
      <Col>
        {LocalStorageService.isUserLoggedIn && (
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
        )}
        {posts && posts.length > 0 ? (
          posts.map((p, k) => <Post {...p} key={k} />)
        ) : (
          <Row justify="center" style={{ height: '10vh' }}>
            <Loading>Loading</Loading>
          </Row>
        )}
      </Col>
    </Row>
  )
}
