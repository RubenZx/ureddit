import { ReactNode } from 'react'
import ForgotPasswordContent from './contents/ForgotPassword'
import LoginContent from './contents/Login'
import RegisterContent from './contents/Register'

const modalContent: Record<string, ReactNode> = {
  login: LoginContent,
  register: RegisterContent,
  forgotPassword: ForgotPasswordContent,
}

export default modalContent
