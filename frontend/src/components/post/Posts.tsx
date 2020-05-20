import { Card, Col, Input, Loading, Row, Spacer } from '@zeit-ui/react'
import { User } from '@zeit-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getPosts } from '../../services/api'
import { LocalStorageService } from '../../services/LocalStorage'
import { Post as PostType } from '../../services/types'
import Post from './Post'
import PostsNotFound from './PostsNotFound'

export default () => {
  const [posts, setPosts] = useState<PostType[]>()
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      setPosts(await getPosts())
      setLoaded(true)
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
        {!loaded ? (
          <Row justify="center" style={{ height: '10vh' }}>
            <Loading>Loading</Loading>
          </Row>
        ) : posts && posts.length > 0 ? (
          posts.map((p, k) => <Post {...p} key={k} />)
        ) : (
          <PostsNotFound />
        )}
      </Col>
    </Row>
  )
}
