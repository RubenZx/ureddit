import { Input, Row, Spacer, User } from '@zeit-ui/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { commentPost } from '../../services/api'
import { useAuth } from '../../services/Auth'
import MyButton from '../buttons/MyButton'
import Gravatar from '../Gravatar'

const validationCommentSchema = yup.object().shape({
  content: yup.string().required('Please, enter a comment'),
})

export default ({
  postid,
  onComment,
  commentid = null,
}: {
  postid: string
  onComment?: () => void
  commentid?: string | null
}) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const {
    handleSubmit,
    errors,
    control,
    setError,
    formState,
    setValue,
  } = useForm({
    validationSchema: validationCommentSchema,
  })

  const onSubmit = async (values: Record<string, any>) => {
    try {
      await commentPost({ ...values, post_id: postid, comment_id: commentid })
      onComment && onComment()
      setValue('content', '')
    } catch (error) {
      setError(
        'server',
        error.response.status,
        error.response.data.messages.error,
      )
    }
  }
  return (
    <form
      onSubmit={(event) => handleSubmit(onSubmit)(event)}
      style={{ width: '100%' }}
    >
      <Row align="middle">
        {user && !user.avatar ? (
          <Gravatar
            email={user.email}
            name=""
            className="menu"
            onClick={() => navigate('/u/' + user?.username)}
          />
        ) : (
          <User
            className="menu"
            src={'/images/' + user?.avatar}
            name=""
            onClick={() => navigate('/u/' + user?.username)}
          />
        )}
        <Controller
          as={Input}
          name="content"
          width="100%"
          control={control}
          defaultValue=""
          placeholder={
            (errors.content && errors.content.message) || 'New comment...'
          }
          status={
            errors.content && errors.content.message ? 'error' : undefined
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
  )
}
