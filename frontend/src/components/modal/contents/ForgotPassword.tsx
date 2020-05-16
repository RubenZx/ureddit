import { Col, Dot, Input, Link, Spacer, Text } from '@zeit-ui/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import Logo from '../../../assets/logo.png'
import MyButton from '../../buttons/MyButton'
import { TypeHandler } from '../MyModal'

const forgotPasswordValidationSchema = yup.object().shape({
  email: yup.string().email('Please, introduce a valid email').required(),
})

const ForgotPasswordContent: React.FC<TypeHandler> = ({ typeHandler }) => {
  const { handleSubmit, errors, control } = useForm({
    validationSchema: forgotPasswordValidationSchema,
  })
  const onSubmit = (values: Record<string, any>) => console.log(values)
  return (
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
        <MyButton type="success" size="small" shadow>
          Email me
        </MyButton>
      </form>
      <Spacer />
      <Text small>
        <Link
          color
          onClick={(event) => {
            event.preventDefault()

            typeHandler('login')
          }}
        >
          Log in
        </Link>
        <Dot type="success" style={{ transform: 'scale(0.3)' }} />
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

export default ForgotPasswordContent
