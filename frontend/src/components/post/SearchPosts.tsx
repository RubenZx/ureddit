import { Card, Col, Input, Loading, Row, Spacer } from '@zeit-ui/react'
import { User } from '@zeit-ui/react-icons'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useApi from '../../hooks/useApi'
import { useAuth } from '../../services/Auth'
import { PostsResponse } from '../../services/types'
import Post from './Post'
import PostsNotFound from './PostsNotFound'

export default () => {
  const { isUserLoggedIn } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const q = new URLSearchParams(location.search).get('q') || ''
  const { response, loading } = useApi<PostsResponse>({
    url: `/posts?q=${q}`,
    trigger: q,
  })

  return (
    <Row style={{ marginTop: '20px', marginBottom: '50px' }}>
      <Col>
        {isUserLoggedIn && (
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
        {loading ? (
          <Row justify="center" style={{ height: '10vh' }}>
            <Loading>Loading</Loading>
          </Row>
        ) : response ? (
          response.data.data.map((p, k) => <Post {...p} key={k} />)
        ) : (
          <PostsNotFound />
        )}
      </Col>
    </Row>
  )
}
