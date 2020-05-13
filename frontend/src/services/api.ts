import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
})

export const login = async (data: Record<'email' | 'password', string>) => {
  const res = await api.post('auth/login', data)
  return res.data as { accessToken: string }
}
