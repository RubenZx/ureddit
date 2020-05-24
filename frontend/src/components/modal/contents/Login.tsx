import { Col, Input, Link, Note, Spacer, Text } from '@zeit-ui/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import * as yup from 'yup'
import Logo from '../../../assets/logo.png'
import { login } from '../../../services/api'
import { useAuth } from '../../../services/Auth'
import MyButton from '../../buttons/MyButton'
import { TypeHandler } from '../MyModal'

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
})

const LoginContent: React.FC<TypeHandler> = ({ typeHandler }) => {
  const { handleSubmit, errors, control, setError, formState } = useForm({
    validationSchema: loginValidationSchema,
  })
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { login: setTokens } = useAuth()

  const onSubmit = async (values: Record<string, any>) => {
    try {
      const tokens = await login(values)
      setTokens(tokens)
      navigate(pathname)
      window.location.reload(false)
    } catch (error) {
      setError(
        'server',
        error.response.status,
        error.response.data.messages.error,
      )
    }
  }

  return (
    <Col style={{ padding: '12px' }}>
      <img width={32} src={Logo} alt="Logo" />
      <Text h3 style={{ margin: '20px 0px' }}>
        Sign in
      </Text>

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
        Email
        <Controller
          as={Input}
          name="email"
          width="100%"
          control={control}
          defaultValue=""
          status={errors.email && errors.email.message ? 'error' : undefined}
        />
        <Text small type="error">
          {errors.email && errors.email.message}
        </Text>
        <Spacer />
        Password
        <Controller
          as={Input.Password}
          width="100%"
          name="password"
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
        <MyButton
          type="success"
          size="small"
          shadow
          loading={formState.isSubmitting}
        >
          Sign in
        </MyButton>
      </form>

      <Spacer y={0.5} />
      <Text small>
        <Link
          color
          onClick={(event) => {
            event.preventDefault()
            typeHandler('forgotPassword')
          }}
        >
          Forgot password?
        </Link>
      </Text>
      <Spacer />
      <Text small>
        New to uReddit?{' '}
        <Link
          color
          onClick={(event) => {
            event.preventDefault()
            typeHandler('register')
          }}
        >
          Sign up
        </Link>
      </Text>
    </Col>
  )
}

export default LoginContent
