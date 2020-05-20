import { Row, Spacer, Text } from '@zeit-ui/react'
import { Settings } from '@zeit-ui/react-icons'
import React from 'react'

const MyRow = {
  margin: '0px auto',
  maxWidth: '782pt',
  padding: '20px 0px 10px',
}

export default () => {
  return (
    <>
      <Row align="middle" style={MyRow}>
        <Settings />
        <Spacer x={0.25} />
        <Text h4 style={{ margin: 0 }}>
          User settings
        </Text>
      </Row>
      <Row style={MyRow}>
        {/* {state && <Image width={300} src={'images/' + state.avatar} />} */}
      </Row>
    </>
  )
}
