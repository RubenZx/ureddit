export interface Post {
  created_at: string
  description: string
  id: string
  image: string
  likes: string
  tag_id: string
  title: string
  updated_at: string
  user: User
  user_id: string
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
