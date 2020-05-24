import { Card, Col, Loading, Row, Spacer, Spinner, Text } from '@zeit-ui/react'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import useApi from '../../hooks/useApi'
import { useAuth } from '../../services/Auth'
import { Comments, Post as PostType } from '../../services/types'
import MyButton from '../buttons/MyButton'
import MyModal from '../modal/MyModal'
import { modalTypes } from '../navbar/GeneralBar'
import Comment from './Comment'
import CommentForm from './CommentForm'
import Post from './Post'
import PostsNotFound from './PostsNotFound'

export default () => {
  const [visible, setVisible] = useState(false)
  const [modalType, setModalType] = useState<modalTypes>('login')

  const { postid } = useParams()
  const { isUserLoggedIn } = useAuth()

  const { response, loading, reFetch } = useApi<Comments>({
    url: `posts/${postid}/comments`,
    trigger: postid,
  })

  const { response: postsResponse, loading: postsLoading } = useApi<PostType>({
    url: `posts/${postid}`,
    trigger: postid,
  })

  return (
    <Row
      justify="center"
      style={{ marginTop: '20px', marginBottom: '20px', height: '10vh' }}
    >
      {postsLoading ? (
        <Loading>Loading post</Loading>
      ) : postsResponse ? (
        <Col>
          <Post {...postsResponse.data} />
          <Row justify="center">
            <Card style={{ maxWidth: '600pt', marginTop: '20px' }}>
              {isUserLoggedIn ? (
                <CommentForm onComment={reFetch} postid={postid} />
              ) : (
                <Row justify="space-between" align="middle">
                  <Text>Login or sign up to leave a comment</Text>
                  <Row>
                    <MyButton
                      onClick={() => {
                        setModalType('login')
                        setVisible(true)
                      }}
                      size="small"
                      type="success"
                      ghost
                      shadow
                    >
                      Login
                    </MyButton>
                    <Spacer x={0.5} inline />
                    <MyButton
                      onClick={() => {
                        setModalType('register')
                        setVisible(true)
                      }}
                      type="success"
                      size="small"
                      shadow
                    >
                      Sign up
                    </MyButton>
                  </Row>
                </Row>
              )}
            </Card>
          </Row>
          <Row justify="center" style={{ marginBottom: '50px' }}>
            <Card style={{ maxWidth: '600pt', marginTop: '20px' }}>
              {loading ? (
                <Row justify="center">
                  <Spinner />
                </Row>
              ) : response ? (
                response.data.data.map((comment, idk) => (
                  <Comment
                    onComment={reFetch}
                    postid={postid}
                    comment={comment}
                    key={idk}
                  />
                ))
              ) : (
                <Text>
                  There are no comments yet, be the first on leave a comment
                </Text>
              )}
            </Card>
          </Row>
        </Col>
      ) : (
        <PostsNotFound />
      )}
      <MyModal
        closeHandler={() => setVisible(false)}
        typeHandler={(type: modalTypes) => setModalType(type)}
        open={visible}
        type={modalType}
      />
    </Row>
  )
}
