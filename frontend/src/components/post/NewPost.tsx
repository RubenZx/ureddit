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
} from '@zeit-ui/react'
import { Image } from '@zeit-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { createPost, getTags, sendFiles } from '../../services/api'
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
  const [tags, setTags] = useState<Record<'id' | 'name', string>[]>()
  const [fileError, setFileError] = useState(false)

  const { handleSubmit, errors, control } = useForm({
    validationSchema: postValidationSchema,
  })

  const onSubmit = async (
    values: Record<'title' | 'id_tag' | 'description', string>,
  ) => {
    const res = await sendFiles(file)
    res.image += file[0].type
    createPost({ ...values, ...res })
  }

  useEffect(() => {
    ;(async () => {
      setTags(await getTags())
    })()
  }, [])

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
                    name="id_tag"
                    as={Select}
                    placeholder="Choose a tag"
                    control={control}
                  >
                    {tags &&
                      tags.map((t) => (
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
                    <MyButton size="small" type="success" shadow>
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
