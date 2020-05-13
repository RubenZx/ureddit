import { Col, Input, Link, Spacer, Text } from '@zeit-ui/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import Logo from '../../../assets/logo.png'
import MyButton from '../../MyButton'
import { TypeHandler } from '../MyModal'

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
})

const LoginContent: React.FC<TypeHandler> = ({ typeHandler }) => {
  const { handleSubmit, errors, control } = useForm({
    validationSchema: loginValidationSchema,
  })

  const onSubmit = (values: Record<string, any>) => console.log(values)

  return (
    <Col style={{ padding: '12px' }}>
      <img width={32} src={Logo} alt="Logo" />
      <Text h3 style={{ margin: '20px 0px' }}>
        Sign in
      </Text>
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
        <MyButton type="success" size="small" shadow>
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
