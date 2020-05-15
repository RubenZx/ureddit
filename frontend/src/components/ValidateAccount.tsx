import { Card, Col, Row, Spacer, Text } from '@zeit-ui/react'
import { Mail } from '@zeit-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { validateAccount } from '../services/api'

export default () => {
  const [validate, setValidate] = useState<string>()
  const { validationCode } = useParams()

  useEffect(() => {
    if (validationCode) {
      ;(async () => {
        try {
          const res = await validateAccount(validationCode)
          setValidate(res)
        } catch (error) {
          setValidate(error.response.data.messages.error)
        }
      })()
    }
  }, [validationCode, setValidate])

  return (
    <Row justify="center" align="middle" style={{ minHeight: '70vh' }}>
      <Card shadow style={{ maxWidth: '420px' }}>
        <Row justify="space-around">
          <Col>
            <Row justify="center">
              {validationCode ? (
                <Text h3>Validating your account...</Text>
              ) : (
                <Text h3>Please, confirm your account</Text>
              )}
            </Row>
            <Row justify="center">
              <Text h4>
                <Row align="middle">
                  {validationCode ? (
                    validate
                  ) : (
                    <>
                      Check your email inbox
                      <Spacer x={0.5} />
                      <Mail />
                    </>
                  )}
                </Row>
              </Text>
            </Row>
          </Col>
        </Row>
      </Card>
    </Row>
  )
}
