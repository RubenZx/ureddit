import {
  Card,
  Col,
  Input,
  Link,
  Row,
  Spacer,
  Text,
  useToasts,
} from '@zeit-ui/react'
import { Mail } from '@zeit-ui/react-icons'
import { NormalTypes } from '@zeit-ui/react/dist/utils/prop-types'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { validateAccount } from '../services/api'
import MyButton from './MyButton'

export default () => {
  const { validationCode } = useParams()
  const { control, handleSubmit } = useForm()

  const [, setToast] = useToasts()
  const openToast = (type: NormalTypes, text: string) =>
    setToast({
      text,
      type,
    })

  const onSubmit = async (value: Record<string, string>) => {
    try {
      const res = await validateAccount(value.verificationCode)
      openToast('success', res)
    } catch (error) {
      openToast(
        'error',
        `${error.response.status}: ${error.response.data.messages.error}`,
      )
    }
  }

  return (
    <Row justify="center" align="middle" style={{ minHeight: '70vh' }}>
      <Card shadow style={{ maxWidth: '280pt' }}>
        <Row justify="space-around">
          <Col>
            <Text h3>Please, confirm your account</Text>
            <Text h4>
              <Row align="middle">
                Check your email inbox
                <Spacer x={0.5} />
                <Mail />
              </Row>
            </Text>
            <form
              onSubmit={(e) => {
                handleSubmit(onSubmit)(e)
              }}
            >
              Validation code
              <Controller
                as={Input}
                value={validationCode}
                name="verificationCode"
                width="100%"
                control={control}
                defaultValue={validationCode}
              />
              <Row>
                <Text small>
                  Didn't receive anything? <Link color>Resend email</Link>
                </Text>
              </Row>
              <Spacer />
              <Row justify="end">
                <MyButton type="success" size="small" shadow>
                  Validate account
                </MyButton>
              </Row>
            </form>
          </Col>
        </Row>
      </Card>
    </Row>
  )
}
