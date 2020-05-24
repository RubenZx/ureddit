export interface Post {
  created_at: string
  description: string
  id: string
  image: string
  likes: Like[]
  tag: Tag
  tag_id: string
  title: string
  updated_at: string
  user: User
  user_id: string
}

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
