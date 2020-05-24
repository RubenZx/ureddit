import { Loading, Row, Spacer, Text } from '@zeit-ui/react'
import { Settings } from '@zeit-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router'
import { useAuth } from '../../services/Auth'

const MyRow = {
  margin: '0px auto',
  maxWidth: '782pt',
  padding: '20px 0px 10px',
}

export default () => {
  const { user, isUserLoggedIn } = useAuth()
  const { username } = useParams()
  const [state, setCanEdit] = useState({ loading: true, canEdit: false })

  useEffect(() => {
    if (isUserLoggedIn && user) {
      console.log({ username, user })
      setCanEdit({ loading: false, canEdit: username === user?.username })
    }
  }, [user, username, isUserLoggedIn])

  return state.loading ? (
    <Loading>Loading...</Loading>
  ) : state.canEdit ? (
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
  ) : (
    <Navigate to="/" />
  )
}
