export interface PostsResponse {
  currentPage: number
  data: Post[]
  hasMore: boolean
  next: string
  pageCount: number
  pageSelector: string
  perPage: number
  previous: any
  segment: number
  total: number
  uri: Uri
}

export interface Post {
  created_at: string
  description: string
  id: string
  image: string
  likes: any[]
  tag: Tag
  tag_id: string
  title: string
  updated_at: string
  user: User
  user_id: string
}

export interface Uri {}

export interface Like {
  id: string
  post_id: string
  user_id: string
}

export interface Tag {
  id: string
  name: string
}

export interface User {
  avatar: any
  created_at: string
  email: string
  id: number
  name: any
  token_version: number
  updated_at: string
  username: string
  verified: boolean
}

export interface Comments {
  data: Comment[]
}

export interface Comment {
  children: Comment[]
  comment_id: any
  content: string
  created_at: string
  id: string
  is_reply: string
  updated_at: string
  user: User
  user_id: string
}
