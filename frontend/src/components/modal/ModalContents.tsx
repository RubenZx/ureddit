import { Col, Dot, Input, Link, Spacer, Text } from '@zeit-ui/react'
import React, { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Logo from '../../assets/logo.png'
import MyButton from '../MyButton'
import { TypeHandler } from './MyModal'

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
})

const LoginContent: React.FC<TypeHandler> = ({ typeHandler }) => {
  const { register, handleSubmit, errors } = useForm({
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
        <Input width="100%" name="email" ref={register} />
        <Text small type="error">
          {errors.email && errors.email.message}
        </Text>
        <Spacer />
        Password
        <Input.Password width="100%" name="password" ref={register} />
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
        <Link color onClick={() => typeHandler('forgotPassword')}>
          Forgot password?
        </Link>
      </Text>
      <Spacer />
      <Text small>
        New to uReddit?{' '}
        <Link color onClick={() => typeHandler('register')}>
          Sign up
        </Link>
      </Text>
    </Col>
  )
}

const RegisterContent: React.FC<TypeHandler> = ({ typeHandler }) => (
  <Col style={{ padding: '12px' }}>
    <img width={32} src={Logo} alt="Logo" />
    <Text h3 style={{ margin: '20px 0px' }}>
      Sign up
    </Text>
    <Text small>
      By having an uReddit account, you can join, vote, and comment on all your
      favorite uReddit content.
    </Text>
    <Spacer />
    Email
    <Input width="100%" />
    <Spacer />
    Password
    <Input.Password width="100%" />
    <Spacer />
    Repeat your password
    <Input.Password width="100%" />
    <Spacer />
    <MyButton type="success" size="small" shadow>
      Sign up
    </MyButton>
    <Spacer />
    <Text small>
      Already a uRedditor?{' '}
      <Link color onClick={() => typeHandler('login')}>
        Log in
      </Link>
    </Text>
  </Col>
)

const ForgotPasswordContent: React.FC<TypeHandler> = ({ typeHandler }) => (
  <Col style={{ padding: '12px' }}>
    <img width={32} src={Logo} alt="Logo" />
    <Text h3 style={{ margin: '20px 0px' }}>
      Reset your password
    </Text>
    <Text small>
      Don't worry! You may have forgotten your password, but we can help you
      out. Enter your email below and we'll send an email with a link to reset
      your password.
    </Text>
    <Spacer />
    Email
    <Input width="100%" />
    <Spacer />
    <MyButton type="success" size="small" shadow>
      Email me
    </MyButton>
    <Spacer />
    <Text small>
      <Link color onClick={() => typeHandler('login')}>
        Log in
      </Link>
      <Dot type="success" style={{ transform: 'scale(0.3)' }} />
      <Link color onClick={() => typeHandler('register')}>
        Sign up
      </Link>
    </Text>
  </Col>
)

const modalContent: Record<string, ReactNode> = {
  login: LoginContent,
  register: RegisterContent,
  forgotPassword: ForgotPasswordContent,
}

export default modalContent
