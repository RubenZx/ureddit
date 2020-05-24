import {
  Card,
  Col,
  Image,
  Link,
  Row,
  Spacer,
  Tag,
  Text,
  useToasts,
  Utils,
} from '@zeit-ui/react'
import { Heart, MessageSquare, Share } from '@zeit-ui/react-icons'
import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router'
import { likePost } from '../../services/api'
import { Post } from '../../services/types'
import './post.css'

const { useClipboard } = Utils

export default ({
  created_at,
  description,
  id,
  image,
  likes,
  tag,
  title,
  user,
  updated_at,
}: Post) => {
  const navigate = useNavigate()

  const [, setToast] = useToasts()
  const { copy } = useClipboard()
  const handler = () => {
    copy('/comments/' + id)
    setToast({ type: 'success', text: 'Link copied successfully!' })
  }

  // const userInLikes = likes.find((like) => +like.user_id === currentUser?.id)
  // const lks = likes.filter((like) => id === like.post_id)

  return (
    <Row justify="center" style={{ marginTop: '20px' }}>
      <Card style={{ maxWidth: '600pt' }}>
        <Row>
          {/* <Col span={1} style={{ marginRight: '20px' }}>
            <IconButton
              disabled={userInLikes !== undefined}
              icon={ArrowUp}
              onClick={(event) => event.preventDefault()}
              style={{ paddingRight: '0.5rem' }}
            />
            <Row justify="center">{likes.length}</Row>
            <IconButton
              icon={ArrowDown}
              onClick={(event) => event.preventDefault()}
              style={{ paddingRight: '0.5rem' }}
            />
          </Col> */}
          <Col>
            <Text small>
              Posted by{' '}
              <Link color onClick={() => navigate('/u/' + user.username)}>
                u/{user.username}
              </Link>{' '}
              {moment(created_at).format('LL')}
              <Tag type="lite" style={{ marginLeft: '10px' }}>
                {tag.name}
              </Tag>
            </Text>
            <Row justify="space-between">
              <Text h4 style={{ margin: '0.5rem 0rem 1rem' }}>
                <Link underline onClick={() => navigate('/comments/' + id)}>
                  {title}
                </Link>
              </Text>
              <Row align="middle">
                {likes.length}
                <Spacer x={0.3} />
                <Heart color="red" size={18} />
              </Row>
            </Row>
            <Image width={300} src={'/images/' + image} />
            <Text p style={{ marginTop: '1rem' }}>
              {description}
            </Text>
            <Row style={{ marginTop: '10px' }}>
              <Col span={2}>
                <Row
                  onClick={async () => {
                    try {
                      await likePost(id)
                    } catch (e) {
                      setToast({
                        type: 'warning',
                        text: 'Sign in or sign up to give a like!',
                        delay: 3000,
                      })
                    }
                  }}
                  align="middle"
                  style={{ cursor: 'pointer' }}
                >
                  <Heart size={18} />
                  <Text small style={{ marginLeft: '5px' }}>
                    Like
                  </Text>
                </Row>
              </Col>
              <Spacer x={0.5} />
              <Col span={4}>
                <Link onClick={() => navigate('/comments/' + id)}>
                  <Row align="middle">
                    <MessageSquare size={18} />
                    <Text small style={{ marginLeft: '5px' }}>
                      Comments
                    </Text>
                  </Row>
                </Link>
              </Col>
              <Spacer x={0.5} />
              <Col>
                <Row onClick={handler} align="middle" className="copy-link">
                  <Share size={18} />
                  <Text small style={{ marginLeft: '5px' }}>
                    Copy link
                  </Text>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Row>
  )
}
