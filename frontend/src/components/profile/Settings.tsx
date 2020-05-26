import {
  Avatar,
  Badge,
  Col,
  Input,
  Row,
  Spacer,
  Text,
  useToasts,
} from '@zeit-ui/react'
import { Edit2, Settings } from '@zeit-ui/react-icons'
import { NormalTypes } from '@zeit-ui/react/dist/utils/prop-types'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { sendFiles, updateUser } from '../../services/api'
import { useAuth } from '../../services/Auth'
import MyButton from '../buttons/MyButton'
import { GRAVATAR_URI, queryString } from '../Gravatar'
import ImageForm from '../images/ImageForm'
import './settings.css'

export default () => {
  const [file, setFile] = useState<File[]>([])
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  const { handleSubmit, control, formState } = useForm()
  const navigate = useNavigate()
  const [, setToast] = useToasts()
  const openToast = (type: NormalTypes, text: string) =>
    setToast({
      text,
      type,
      delay: 2000,
    })

  const onSubmit = async (values: Record<string, any>) => {
    if (user) {
      try {
        const res = await sendFiles(file)
        await updateUser(user.id, { ...values, avatar: res.image })
        openToast(
          'success',
          'Profile updated successfully, redirecting to home',
        )
        setTimeout(() => navigate('/'), 2000)
      } catch (e) {}
    }
  }

  return (
    <Row
      align="middle"
      justify="center"
      style={{
        margin: '0px auto',
        maxWidth: '782pt',
        padding: '20px 0px 20px',
      }}
    >
      <Col>
        <Row justify="center" align="middle">
          <Settings />
          <Spacer x={0.25} />
          <Text h4 style={{ margin: 0 }}>
            User settings
          </Text>
        </Row>
        <Spacer y={0.5} />
        {user && (
          <form
            onSubmit={(event) => {
              event.preventDefault()
              handleSubmit(onSubmit)(event)
            }}
            style={{ width: '100%' }}
          >
            <Row justify="center" align="bottom">
              <Col span={3}>
                <Badge.Anchor
                  placement="bottomRight"
                  style={{ marginRight: '12px' }}
                >
                  <Badge
                    size="mini"
                    className="badge-cursor"
                    onClick={() => setOpen(true)}
                  >
                    <Edit2 size={16} />
                  </Badge>
                  <ImageForm
                    file={file}
                    open={open}
                    setClose={() => setOpen(false)}
                    setFile={(file: File[]) => setFile(file)}
                  />
                  <Avatar
                    size="large"
                    src={
                      user.avatar
                        ? '/images/' + user.avatar
                        : GRAVATAR_URI +
                          user.email +
                          queryString({
                            size: 300,
                            d: 'retro',
                            rating: 'g',
                          })
                    }
                  />
                </Badge.Anchor>
              </Col>
              <Col span={6}>
                <div>
                  <Text style={{ marginBottom: '0px' }}>Name:</Text>
                  <Controller
                    as={Input}
                    name="name"
                    control={control}
                    defaultValue={user.name || ''}
                  />
                </div>
                <Spacer y={1} />
                <MyButton
                  loading={formState.isSubmitting}
                  size="small"
                  type="success"
                  ghost
                  shadow
                >
                  Change
                </MyButton>
              </Col>
            </Row>
          </form>
        )}
      </Col>
    </Row>
  )
}
