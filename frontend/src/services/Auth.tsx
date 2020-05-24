import axios, { AxiosError } from 'axios'
import React, { useCallback, useContext, useEffect, useReducer } from 'react'
import { routes } from '../routes'
import { history } from '../routes/history'
import { LocalStorageService, Tokens } from './LocalStorage'
import { User } from './types'

export const api = axios.create({ baseURL: 'http://localhost:3000/api/' })

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

type ActionMap<M extends Record<string, any>> = {
  [K in keyof M]: M[K] extends undefined
    ? { type: K }
    : { type: K; payload: M[K] }
}

export interface AuthState {
  user?: User
  accessToken?: string
  refreshToken?: string
  isUserLoggedIn?: boolean
}

const AuthActionsType = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  USER: 'USER',
} as const

export interface ActionsPayload {
  [AuthActionsType.LOGIN]: Tokens
  [AuthActionsType.LOGOUT]: undefined
  [AuthActionsType.USER]: User
}

export interface AuthContextType extends AuthState {
  setState: React.Dispatch<AuthActions>
}

export const AuthContext = React.createContext({} as AuthContextType)

export type AuthActions = ActionMap<ActionsPayload>[keyof ActionMap<
  ActionsPayload
>]

const reducer: React.Reducer<AuthState, AuthActions> = (state, action) => {
  switch (action.type) {
    case AuthActionsType.LOGIN:
      LocalStorageService.setTokens(action.payload)
      return {
        ...state,
        isUserLoggedIn: LocalStorageService.isUserLoggedIn,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      }
    case AuthActionsType.LOGOUT:
      LocalStorageService.clearTokens()
      return {
        ...state,
        user: undefined,
        accessToken: undefined,
        refreshToken: undefined,
        isUserLoggedIn: false,
      }
    case AuthActionsType.USER:
      return { ...state, user: action.payload }
    default:
      return state
  }
}

export const AuthProvider: React.FC = ({ children }) => {
  const [state, setState] = useReducer(reducer, {})

  useEffect(() => {
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { config, response } = error as AxiosError

        if (response!.status === 401 && config.url === 'auth/refresh-token') {
          history.push(routes.submit)
          return Promise.reject(error)
        }

        if (response!.status === 401 && !(config as any)._retry) {
          ;(config as any)._retry = true
          const res = await api.post('auth/refresh-token', {
            refreshToken: LocalStorageService.refreshToken,
          })
          if (res.status === 201) {
            setState({ type: 'LOGIN', payload: res.data as Tokens })
            api.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${LocalStorageService.accessToken}`
            return api(config)
          }
        }
        return Promise.reject(error)
      },
    )
    if (LocalStorageService.accessToken && LocalStorageService.refreshToken) {
      setState({
        type: 'LOGIN',
        payload: {
          refreshToken: LocalStorageService.refreshToken,
          accessToken: LocalStorageService.accessToken,
        },
      })
    }
  }, [])

  useEffect(() => {
    if (LocalStorageService.userId) {
      api.get<User>(`users/${LocalStorageService.userId}`).then((res) => {
        setState({ type: 'USER', payload: res.data })
      })
    }
    if (
      !LocalStorageService.isUserLoggedIn &&
      LocalStorageService.refreshToken
    ) {
      api.post('auth/refresh-token').then((res) => {
        if (res.status === 201) {
          setState({ type: 'LOGIN', payload: res.data as Tokens })
        }
      })
    }
  }, [state.isUserLoggedIn])
  return (
    <AuthContext.Provider value={{ ...state, setState }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const { setState, user, isUserLoggedIn } = useContext(AuthContext)
  const login = useCallback(
    (tokens: Tokens) => {
      setState({ type: 'LOGIN', payload: tokens })
    },
    [setState],
  )

  const logout = useCallback(() => {
    api.get('auth/revoke-token').then(() => {
      setState({ type: 'LOGOUT' })
    })
  }, [setState])

  return { login, logout, user, isUserLoggedIn }
}
