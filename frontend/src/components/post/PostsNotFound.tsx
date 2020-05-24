import { Card, Col, Row, Text } from '@zeit-ui/react'
import { Pin } from '@zeit-ui/react-icons'
import React from 'react'

export default () => (
  <Row justify="center" style={{ marginTop: '20px' }}>
    <Card style={{ maxWidth: '600pt' }}>
      <Row justify="center" align="middle" style={{ minHeight: '40vh' }}>
        <Col>
          <Row justify="center" style={{ marginBottom: '0.5rem' }}>
            <Pin />
          </Row>
          <Row justify="center">
            <Text h3>There aren't posts yet</Text>
          </Row>
        </Col>
      </Row>
    </Card>
  </Row>
)
