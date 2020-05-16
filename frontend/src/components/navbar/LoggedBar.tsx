import { Row } from '@zeit-ui/react'
import { Edit } from '@zeit-ui/react-icons'
import React from 'react'
import { useNavigate } from 'react-router'
import IconButton from '../buttons/IconButton'
import Dropdown from '../dropdown/Dropdown'

export default () => {
  const navigate = useNavigate()
  return (
    <Row justify="end" align="middle">
      <IconButton icon={Edit} onClick={() => navigate('/submit')} />
      <Dropdown />
    </Row>
  )
}
