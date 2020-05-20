import { Card, Input, Note, Row, Spacer, Text, useToasts } from '@zeit-ui/react'
import { NormalTypes } from '@zeit-ui/react/dist/utils/prop-types'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import * as yup from 'yup'
import { resetPassword } from '../services/api'
import MyButton from './buttons/MyButton'

const resetPasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Password is too short')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

export default () => {
  const { code } = useParams()
  const navigate = useNavigate()
  const { handleSubmit, errors, control, setError } = useForm({
    validationSchema: resetPasswordValidationSchema,
  })

  const [, setToast] = useToasts()
  const openToast = (type: NormalTypes, text: string) =>
    setToast({
      text,
      type,
      delay: 3000,
    })

  const onSubmit = async ({ password }: Record<string, any>) => {
    try {
      if (code && typeof code === 'string') {
        await resetPassword({ code, password })
        openToast(
          'success',
          'Password reset successfully, redirecting to home.',
        )
        setTimeout(() => navigate('/'), 3000)
      }
    } catch (error) {
      setError(
        'server',
        'server: ' + error.response.status,
        error.response.data.messages.error,
      )
    }
  }

  return (
    <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
      <Card width="auto">
        {errors.server && (
          <>
            <Note type="error" label="error">
              {errors.server.message}
            </Note>
            <Spacer />
          </>
        )}

        <form
          onSubmit={(e) => {
            handleSubmit(onSubmit)(e)
          }}
        >
          New password
          <Controller
            as={Input.Password}
            name="password"
            width="100%"
            control={control}
            defaultValue=""
            status={
              errors.password && errors.password.message ? 'error' : undefined
            }
          />
          <Text small type="error">
            {errors.password && errors.password.message}
          </Text>
          <Spacer />
          Repeat your new password
          <Controller
            as={Input.Password}
            name="confirmPassword"
            width="100%"
            control={control}
            defaultValue=""
            status={
              errors.confirmPassword && errors.confirmPassword.message
                ? 'error'
                : undefined
            }
          />
          <Text small type="error">
            {errors.confirmPassword && errors.confirmPassword.message}
          </Text>
          <Spacer />
          <MyButton type="success" size="small" shadow>
            Reset password
          </MyButton>
        </form>
      </Card>
    </Row>
  )
}
