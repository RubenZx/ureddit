import {
  Card,
  Col,
  Input,
  Loading,
  Row,
  Spacer,
  Spinner,
  Text,
  User,
} from '@zeit-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import NotAvatarBlack from '../../assets/notavatarblack.png'
import NotAvatarWhite from '../../assets/notavatarwhite.png'
import { getPost, getUser } from '../../services/api'
import { LocalStorageService } from '../../services/LocalStorage'
import { Post as PostType, User as UserType } from '../../services/types'
import MyButton from '../buttons/MyButton'
import MyModal from '../modal/MyModal'
import { modalTypes } from '../navbar/GeneralBar'
import { useTheme } from '../ThemeContext'
import Post from './Post'
import PostsNotFound from './PostsNotFound'

export default () => {
  const [loaded, setLoaded] = useState(false)
  const [loadedUser, setLoadedUser] = useState(false)
  const [visible, setVisible] = useState(false)
  const [post, setPost] = useState<PostType>()
  const [user, setUser] = useState<UserType>()
  const [modalType, setModalType] = useState<modalTypes>('login')

  const { themeType } = useTheme()
  const { postid } = useParams()

  useEffect(() => {
    ;(async () => {
      setPost(await getPost(+postid))
      setLoaded(true)
    })()
  }, [postid])

  useEffect(() => {
    ;(async () => {
      if (LocalStorageService.userLogged) {
        setUser(await getUser(LocalStorageService.userLogged.id))
        setLoadedUser(true)
      }
    })()
  }, [])

  return (
    <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
      {post ? (
        <Col>
          <Post {...post} />
          <Row justify="center">
            <Card style={{ maxWidth: '600pt', marginTop: '20px' }}>
              {LocalStorageService.isUserLoggedIn ? (
                <Row align="middle">
                  {loadedUser ? (
                    <User
                      name={''}
                      src={
                        user?.avatar
                          ? '/images/' + user.avatar
                          : themeType === 'dark'
                          ? NotAvatarBlack
                          : NotAvatarWhite
                      }
                    />
                  ) : (
                    <Spinner />
                  )}
                  <Input
                    placeholder="New comment..."
                    width="100%"
                    onClick={() => {}}
                  />
                  <Spacer x={1} inline />
                  <MyButton size="small" type="success" ghost shadow>
                    Comment
                  </MyButton>
                </Row>
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
          <Row justify="center">
            <Text>COMMENTS HERE</Text>
          </Row>
        </Col>
      ) : loaded ? (
        <PostsNotFound />
      ) : (
        <Loading>Loading</Loading>
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
