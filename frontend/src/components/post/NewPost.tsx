import {
  Card,
  Col,
  Divider,
  Input,
  Row,
  Select,
  Spacer,
  Text,
  Textarea,
  useToasts,
} from '@zeit-ui/react'
import { Image } from '@zeit-ui/react-icons'
import { NormalTypes } from '@zeit-ui/react/dist/utils/prop-types'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import useApi from '../../hooks/useApi'
import { createPost, sendFiles } from '../../services/api'
import IconButton from '../buttons/IconButton'
import MyButton from '../buttons/MyButton'
import ImageForm from '../images/ImageForm'

const postValidationSchema = yup.object().shape({
  title: yup.string().required('Please, enter a title'),
  tag: yup.number(),
  description: yup.string(),
})

const NewPost = () => {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File[]>([])
  const [fileError, setFileError] = useState(false)

  const { response } = useApi<
    {
      id: string
      name: string
    }[]
  >({ url: 'tags', trigger: '' })

  const [, setToast] = useToasts()
  const openToast = (type: NormalTypes, text: string) =>
    setToast({
      text,
      type,
      delay: 2500,
    })

  const { handleSubmit, errors, control, formState } = useForm({
    validationSchema: postValidationSchema,
  })

  const navigate = useNavigate()

  const onSubmit = async (
    values: Record<'title' | 'tag_id' | 'description', string>,
  ) => {
    try {
      const res = await sendFiles(file)
      await createPost({ ...values, ...res })
      openToast('success', 'Post created successfully, redireting to home')
      setTimeout(() => navigate('/'), 2500)
    } catch (e) {}
  }

  useEffect(() => {
    if (file !== undefined) {
      setFileError(false)
    }
  }, [file])

  return (
    <Row
      justify="start"
      style={{
        margin: '20px auto',
        maxWidth: '782pt',
        padding: '10px 0px 10px',
      }}
    >
      <Card>
        <Card.Content>
          <Text h4={true}>Create a post</Text>
        </Card.Content>

        <Divider y={0} />
        <Card.Content>
          <Row>
            <form
              style={{ width: '100%' }}
              onSubmit={(e) => {
                setFileError(file && file.length < 1 ? true : false)
                handleSubmit(onSubmit)(e)
              }}
            >
              <Row
                justify="space-around"
                align="middle"
                style={{ marginBottom: '20px' }}
              >
                <Col span={6}>
                  <Controller
                    name="tag_id"
                    as={Select}
                    placeholder="Choose a tag"
                    control={control}
                  >
                    {response &&
                      response.data.map((t) => (
                        <Select.Option key={t.id} value={t.id}>
                          {t.name}
                        </Select.Option>
                      ))}
                  </Controller>
                </Col>
                <Col span={16}>
                  <Controller
                    as={Input}
                    name="title"
                    placeholder="Title"
                    width="100%"
                    control={control}
                    defaultValue=""
                    status={
                      errors.title && errors.title.message ? 'error' : undefined
                    }
                  />
                </Col>
                <Col span={2}>
                  <IconButton
                    icon={Image}
                    onClick={(event) => {
                      event.preventDefault()
                      setOpen(true)
                    }}
                    style={{
                      height: '36px',
                      paddingRight: '0.5rem',
                      borderColor: fileError ? '#ff0000' : undefined,
                    }}
                  />
                  <ImageForm
                    file={file}
                    open={open}
                    setClose={() => setOpen(false)}
                    setFile={(file: File[]) => setFile(file)}
                  />
                </Col>
              </Row>
              <Controller
                as={Textarea}
                name="description"
                placeholder="Description..."
                width="100%"
                minHeight="350px"
                control={control}
                defaultValue=""
              />

              <Row justify="space-between" style={{ marginTop: '20px' }}>
                <Col>
                  <Row justify="end">
                    <MyButton
                      onClick={(e) => {
                        e.preventDefault()
                        console.log('Aborting...')
                      }}
                      size="small"
                      type="abort"
                    >
                      Cancel
                    </MyButton>
                    <Spacer x={0.5} inline />
                    <MyButton
                      loading={formState.isSubmitting}
                      size="small"
                      type="success"
                      shadow
                    >
                      Post
                    </MyButton>
                  </Row>
                </Col>
              </Row>
            </form>
          </Row>
        </Card.Content>
      </Card>
    </Row>
  )
}

export default NewPost
