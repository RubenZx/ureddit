import { Col, Link, Row, Text } from '@zeit-ui/react'
import { MessageCircle } from '@zeit-ui/react-icons'
import moment from 'moment'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Comment as CommentType } from '../../services/types'
import CommentForm from './CommentForm'
import './post.css'

const Comment = ({
  comment,
  onComment,
  postid,
  level = 1,
}: {
  comment: CommentType
  onComment: () => void
  postid: string
  level?: number
}) => {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      style={{
        padding: '20px',
      }}
    >
      <Row>
        <Col
          span={1}
          style={{ borderLeftWidth: '1px', borderLeftStyle: 'groove' }}
        />
        <Col>
          <Row>
            <Text small>
              <Link
                color
                onClick={() => navigate('/u/' + comment.user.username)}
              >
                u/{comment.user.username}
              </Link>{' '}
              {moment(comment.created_at).format('LL')}
            </Text>
          </Row>
          <Row>
            <Text>{comment.content}</Text>
          </Row>
          {!visible ? (
            <Row
              align="middle"
              className="copy-link"
              onClick={() => setVisible(true)}
            >
              <MessageCircle size={18} />
              <Text small style={{ marginLeft: '5px' }}>
                Reply
              </Text>
            </Row>
          ) : (
            <Row>
              <CommentForm
                postid={postid}
                commentid={comment.id}
                onComment={onComment}
              />
            </Row>
          )}
        </Col>
      </Row>
      {comment.children.map((child, idk) => (
        <Comment
          onComment={onComment}
          postid={postid}
          comment={child}
          level={level + 1}
          key={idk}
        />
      ))}
    </div>
  )
}

export default Comment
