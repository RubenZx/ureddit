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
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import IconButton from './buttons/IconButton'
import MyButton from './buttons/MyButton'

const Tags = [
  { value: '1', content: 'Tag-1' },
  { value: '2', content: 'Tag-2' },
  { value: '3', content: 'Tag-3' },
]

const postValidationSchema = yup.object().shape({
  title: yup.string().length(300).required('Please, enter a title'),
  tag: yup.number(),
  description: yup.string().required('Please, give a description'),
})

const NewPost = () => {
  const { handleSubmit, errors, control } = useForm({
    validationSchema: postValidationSchema,
  })

  const onSubmit = (values: Record<string, any>) => console.log(values)

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
                handleSubmit(onSubmit)(e)
              }}
            >
              <Row
                justify="space-around"
                align="middle"
                style={{ marginBottom: '20px' }}
              >
                <Col span={6}>
                  <Select placeholder="Choose a tag">
                    {Tags.map((t) => (
                      <Select.Option key={t.content} value={t.value}>
                        {t.content}
                      </Select.Option>
                    ))}
                  </Select>
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
                    onClick={(event) => event.preventDefault()}
                  />
                </Col>
              </Row>
              <Controller
                as={Textarea}
                name="description"
                placeholder="Description..."
                width="100%"
                control={control}
                defaultValue=""
                status={
                  errors.description && errors.description.message
                    ? 'error'
                    : undefined
                }
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
