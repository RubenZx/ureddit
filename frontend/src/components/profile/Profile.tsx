import { Col, Loading, Row } from '@zeit-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getPostsByUserId, getUser } from '../../services/api'
import { Post as PostType, User } from '../../services/types'
import Post from '../post/Post'
import PostsNotFound from '../post/PostsNotFound'
import ProfileCard from './ProfileCard'

export const MyRow = {
  display: 'flow-root',
  margin: '0px auto',
  maxWidth: '782pt',
  padding: '20px 0px 10px',
}

export default () => {
  const [posts, setPosts] = useState<PostType[]>()
  const [user, setUser] = useState<User>()
  const [loaded, setLoaded] = useState(false)
  const { username } = useParams()

  useEffect(() => {
    ;(async () => {
      setUser(await getUser(username))
    })()
  }, [username])

  useEffect(() => {
    if (user?.id) {
      ;(async () => {
        setPosts(await getPostsByUserId(user?.id))
        setLoaded(true)
      })()
    }
  }, [user])

  return (
    <Row align="middle" style={MyRow} gap={1}>
      {!loaded ? (
        <Loading>Loading</Loading>
      ) : posts && posts.length > 0 ? (
        <>
          <Col span={16}>
            {posts.map((p, k) => (
              <Post {...p} key={k} />
            ))}
          </Col>
          <Col span={8}>
            <ProfileCard user={user} />
          </Col>
        </>
      ) : (
        <PostsNotFound />
      )}
    </Row>
  )
}
