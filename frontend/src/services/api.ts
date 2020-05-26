import { api } from './Auth'
import { LocalStorageService, Tokens } from './LocalStorage'

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

export const forgotPassword = async (data: Record<'email', string>) => {
  const res = await api.post('auth/forgot-password', data)
  return res.data
}

export const resetPassword = async ({ code, password }: Record<string, any>) =>
  api.put(`auth/reset-password/${code}`, { password })

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

export const likePost = async (post_id: string) => {
  const res = await api.post('posts/' + post_id + '/like')
  return res.data
}

export const commentPost = async (data: Record<string, any>) => {
  const res = await api.post('posts/' + data.post_id + '/comment', data)
  return res.data
}

export const createPost = async (
  data: Record<'title' | 'tag_id' | 'description' | 'image', string>,
) => {
  const res = await api.post('posts', data)
  return res.data
}

export const updateUser = async (id: number, data: Record<string, any>) => {
  const res = await api.put('users/' + id, data)
  return res.data
}
