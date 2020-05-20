import { Card, Col, Input, Row, Spacer, Text, useToasts } from '@zeit-ui/react'
import { Mail } from '@zeit-ui/react-icons'
import { NormalTypes } from '@zeit-ui/react/dist/utils/prop-types'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { validateAccount } from '../services/api'
import MyButton from './buttons/MyButton'
import ResendEmail from './ResendEmail'

export default () => {
  const { validationCode } = useParams()
  const { control, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [, setToast] = useToasts()
  const openToast = (type: NormalTypes, text: string) =>
    setToast({
      text,
      type,
      delay: 3000,
    })

  const onSubmit = async (value: Record<string, string>) => {
    try {
      const res = await validateAccount(value.verificationCode)
      openToast('success', res)
      setTimeout(() => navigate('/'), 3000)
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
                <ResendEmail />
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
