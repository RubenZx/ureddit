import {
  Card,
  Col,
  Input,
  Loading,
  Row,
  Spacer,
  Text,
  User,
} from '@zeit-ui/react'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import * as yup from 'yup'
import NotAvatarBlack from '../../assets/notavatarblack.png'
import NotAvatarWhite from '../../assets/notavatarwhite.png'
import { commentPost, getPost } from '../../services/api'
import { useAuth } from '../../services/Auth'
import { Post as PostType } from '../../services/types'
import MyButton from '../buttons/MyButton'
import MyModal from '../modal/MyModal'
import { modalTypes } from '../navbar/GeneralBar'
import { useTheme } from '../ThemeContext'
import Post from './Post'
import PostsNotFound from './PostsNotFound'

const validationCommentSchema = yup.object().shape({
  content: yup.string().required('Please, enter a comment'),
})

export default () => {
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)
  const [post, setPost] = useState<PostType>()
  const [modalType, setModalType] = useState<modalTypes>('login')
  const { isUserLoggedIn, user } = useAuth()

  const { handleSubmit, errors, control, setError, formState } = useForm({
    validationSchema: validationCommentSchema,
  })

  const { themeType } = useTheme()
  const { postid } = useParams()

  const onSubmit = async (values: Record<string, any>) => {
    try {
      await commentPost({ ...values, post_id: postid })
    } catch (error) {
      setError(
        'server',
        error.response.status,
        error.response.data.messages.error,
      )
    }
  }

  useEffect(() => {
    ;(async () => {
      setPost(await getPost(+postid))
      setLoaded(true)
    })()
  }, [postid])

  return (
    <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
      {post ? (
        <Col>
          <Post {...post} />
          <Row justify="center">
            <Card style={{ maxWidth: '600pt', marginTop: '20px' }}>
              {isUserLoggedIn ? (
                <form onSubmit={(event) => handleSubmit(onSubmit)(event)}>
                  <Row align="middle">
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
                    <Controller
                      as={Input}
                      name="content"
                      width="100%"
                      control={control}
                      defaultValue=""
                      placeholder={
                        (errors.content && errors.content.message) ||
                        'New comment...'
                      }
                      status={
                        errors.content && errors.content.message
                          ? 'error'
                          : undefined
                      }
                    />
                    <Spacer x={1} inline />
                    <MyButton
                      loading={formState.isSubmitting}
                      size="small"
                      type="success"
                      ghost
                      shadow
                    >
                      Comment
                    </MyButton>
                  </Row>
                </form>
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
