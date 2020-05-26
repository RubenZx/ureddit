import { User } from '@zeit-ui/react'
import { UserProps } from '@zeit-ui/react/dist/user/user'
import md5 from 'blueimp-md5'
import React from 'react'
import './dropdown/dropdown.css'

export interface GravatarProps extends Omit<UserProps, 'src'> {
  email: string
  imgSize?: number
  fallback?:
    | '404'
    | 'mm'
    | 'identicon'
    | 'monsterid'
    | 'wavatar'
    | 'retro'
    | 'robohash'
    | 'blank'
  rating?: 'g' | 'pg' | 'r' | 'x'
}

export const GRAVATAR_URI = 'https://www.gravatar.com/avatar/'

export const queryString = (params: Record<string, unknown>) =>
  '?' +
  Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&')

const Gravatar: React.FC<GravatarProps> = ({
  email,
  imgSize = 120,
  rating = 'g',
  fallback = 'retro',
  children,
  ...rest
}) => {
  const uri = `${GRAVATAR_URI}${md5(email)}${queryString({
    size: imgSize,
    d: fallback,
    rating,
  })}`
  return (
    <User className="menu" src={uri} {...rest}>
      {children}
    </User>
  )
}

export default Gravatar
