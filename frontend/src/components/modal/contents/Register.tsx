import { Col, Input, Link, Spacer, Text } from '@zeit-ui/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import Logo from '../../../assets/logo.png'
import MyButton from '../../MyButton'
import { TypeHandler } from '../MyModal'

const registerValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const RegisterContent: React.FC<TypeHandler> = ({ typeHandler }) => {
  const { handleSubmit, errors, control } = useForm({
    validationSchema: registerValidationSchema,
  })
  const onSubmit = (values: Record<string, any>) => console.log(values)

  return (
    <Col style={{ padding: '12px' }}>
      <img width={32} src={Logo} alt="Logo" />
      <Text h3 style={{ margin: '20px 0px' }}>
        Sign up
      </Text>
      <Text small>
        By having an uReddit account, you can join, vote, and comment on all
        your favorite uReddit content.
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
        Password
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
        Repeat your password
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
          Sign up
        </MyButton>
      </form>

      <Text small>
        Already a uRedditor?{' '}
        <Link
          color
          onClick={(event) => {
            event.preventDefault()
            typeHandler('login')
          }}
        >
          Log in
        </Link>
      </Text>
    </Col>
  )
}

export default RegisterContent
