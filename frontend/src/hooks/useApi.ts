import defaultAxios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  Method,
} from 'axios'
import { useEffect, useReducer, useState } from 'react'
import { api } from '../services/Auth'

enum ActionsType {
  INIT = 'INIT',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

interface ActionsPayload<T> {
  [ActionsType.SUCCESS]: AxiosResponse<T>
  [ActionsType.FAIL]: AxiosError<T>
  [ActionsType.INIT]: undefined
}

type ActionMap<M extends Record<string, any>> = {
  [K in keyof M]: M[K] extends undefined
    ? { type: K }
    : { type: K; payload: M[K] }
}

type Actions<T> = ActionMap<ActionsPayload<T>>[keyof ActionsPayload<T>]

type State<T> = {
  response: AxiosResponse<T> | null
  error: AxiosError<T> | null
  loading: boolean
}

const responseReducer = <T>(state: State<T>, action: Actions<T>): State<T> => {
  switch (action.type) {
    case ActionsType.INIT:
      return { response: null, error: null, loading: true }
    case ActionsType.SUCCESS:
      return { response: action.payload, error: null, loading: false }
    case ActionsType.FAIL:
      return { response: null, error: action.payload, loading: false }
    default:
      return { response: null, error: null, loading: false }
  }
}

type UseAxiosParams<T> = {
  axios?: AxiosInstance
  url: string
  method?: Method
  options?: Record<string, any>
  trigger?: string | Record<string, any>
  forceDispatchEffect?: () => boolean
  customHandler?: (
    error: AxiosError<T> | null,
    response: AxiosResponse<T> | null,
  ) => {}
}

const { CancelToken } = defaultAxios

export default <T = any>({
  axios = api,
  url,
  method = 'get',
  options = {},
  trigger,
  forceDispatchEffect,
  customHandler,
}: UseAxiosParams<T>) => {
  const [results, dispatch] = useReducer<React.Reducer<State<T>, Actions<T>>>(
    responseReducer,
    {
      response: null,
      error: null,
      loading: false,
    },
  )
  const [innerTrigger, setInnerTrigger] = useState(0)

  let outerTrigger = trigger
  try {
    outerTrigger = JSON.stringify(trigger)
  } catch (err) {
    //
  }

  const dispatchEffect = forceDispatchEffect || (() => true)

  const handler = (
    error: AxiosError<T> | null,
    response: AxiosResponse<T> | null,
  ) => {
    if (customHandler) {
      customHandler(error, response)
    }
  }

  useEffect(() => {
    if (!url || !dispatchEffect()) {
      return
    }

    if (typeof outerTrigger === 'undefined' && !innerTrigger) {
      return
    }

    handler(null, null)

    dispatch({ type: ActionsType.INIT })

    const source = CancelToken.source()

    axios({
      url,
      method,
      ...options,
      cancelToken: source.token,
    })
      .then((response) => {
        handler(null, response)
        dispatch({ type: ActionsType.SUCCESS, payload: response })
      })
      .catch((error) => {
        handler(error, null)
        if (!defaultAxios.isCancel(error)) {
          dispatch({ type: ActionsType.FAIL, payload: error })
        }
      })

    return () => {
      source.cancel()
    }
    // eslint-disable-next-line
  }, [innerTrigger, outerTrigger])

  return {
    ...results,
    reFetch: () => {
      setInnerTrigger(+new Date())
    },
  }
}
