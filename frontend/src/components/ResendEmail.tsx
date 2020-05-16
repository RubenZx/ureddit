import { Link, Text } from '@zeit-ui/react'
import React, { useCallback, useState } from 'react'
import useQuery from '../hooks/useQuery'
import { resendVerificationCode } from '../services/api'

const ResendEmail = () => {
  const [status, setStatus] = useState<'initial' | 'sending' | 'sent'>(
    'initial',
  )
  const email = useQuery().get('email')

  const onClick = useCallback(async () => {
    if (email && typeof email == 'string') {
      setStatus('sending')
      await resendVerificationCode({ email })
      setStatus('sent')
    }
  }, [email])

  return (
    <Text small>
      {status === 'initial' && (
        <>
          Didn&#39;t receive anything?{' '}
          <Link color onClick={onClick}>
            Resend email
          </Link>
          .
        </>
      )}
      {status === 'sending' && <>Resending email...</>}
      {status === 'sent' && <>Email resent. Check again!</>}
    </Text>
  )
}

export default ResendEmail
