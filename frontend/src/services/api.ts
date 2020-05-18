import axios, { AxiosError } from 'axios'
import { LocalStorageService, Tokens } from './LocalStorage'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
})

export const login = async (data: Record<'email' | 'password', string>) => {
  const res = await api.post('auth/login', data)
  return res.data as { accessToken: string; refreshToken: string }
}

export const logout = async () => {
  try {
    await api.get('auth/revoke-token')
    LocalStorageService.clearTokens()
    window.location.reload(false)
  } catch (error) {}
}

export const register = async (data: Record<string, any>) => {
  await api.post('auth/register', data)
}

export const validateAccount = async (hash: string) => {
  const res = await api.get('auth/active/' + hash)
  return res.data.message
}

export const resendVerificationCode = async (email: Record<string, any>) => {
  await api.put('auth/resend-active-account', email)
}

export const refreshToken = async () => {
  const { refreshToken } = LocalStorageService
  if (refreshToken) {
    const res = await api.post('auth/refresh-token', { refreshToken })
    LocalStorageService.setTokens(res.data as Tokens)
  }
}

export const sendFiles = async (files: File[]) => {
  const fd = new FormData()
  files.forEach((file) => {
    fd.append('files[]', file, file.name)
  })
  const res = await api.post('images', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return { image: res.data.uploaded[0] }
}

export const createPost = async (
  data: Record<'title' | 'id_tag' | 'description' | 'image', string>,
) => {
  const res = await api.post('posts', data)
  return res.data
}

export const getPosts = async () => {
  const res = await api.get('posts')
  const posts = res.data.map(async (post: any) => {
    const user = await api.get('users/' + post.author)
    return { ...post, author: user.data.username }
  })
  return Promise.all(posts)
}

export const getTags = async () => {
  const res = await api.get('tags')
  return res.data as Record<'id' | 'name', string>[]
}

export const getUserById = async (id: string) => {
  const res = await api.get('users/' + id)
  return res.data.username as Record<'username', string>
}

api.interceptors.request.use(
  (config) => {
    const { accessToken } = LocalStorageService
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    if (!!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error as AxiosError

    if (response!.status === 401 && config.url === 'auth/refresh-token') {
      // history.push('/login')
      return Promise.reject(error)
    }

    if (response!.status === 401 && !(config as any)._retry) {
      ;(config as any)._retry = true
      const res = await api.post('auth/refresh-token', {
        refreshToken: LocalStorageService.refreshToken,
      })
      if (res.status === 201) {
        LocalStorageService.setTokens(res.data as Tokens)
        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${LocalStorageService.accessToken}`
        return api(config)
      }
    }
    return Promise.reject(error)
  },
)
