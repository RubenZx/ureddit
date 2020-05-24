import { Col, Loading, Row } from '@zeit-ui/react'
import React from 'react'
import { useParams } from 'react-router'
import useApi from '../../hooks/useApi'
import { User } from '../../services/types'
import ProfileCard from './ProfileCard'
import UsersPosts from './UsersPosts'

export const MyRow = {
  display: 'flow-root',
  margin: '0px auto',
  maxWidth: '782pt',
  padding: '20px 0px 10px',
}

export default () => {
  const { username } = useParams()
  const { response, loading } = useApi<User>({
    url: `users/${username}`,
    trigger: username,
  })

  return (
    <Row align="middle" style={MyRow} gap={1}>
      <Col span={16}>
        {loading ? (
          <Loading>Loading posts</Loading>
        ) : (
          response && <UsersPosts userid={String(response.data.id)} />
        )}
      </Col>

      <Col span={8}>
        {loading ? (
          <Loading>Loading user data</Loading>
        ) : (
          <ProfileCard user={response?.data} />
        )}
      </Col>
    </Row>
  )
}
