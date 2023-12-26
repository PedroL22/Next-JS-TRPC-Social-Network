'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { api } from '@/trpc/react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const { data, isLoading } = api.auth.userData.useQuery()
  const { mutate: login } = api.auth.login.useMutation({
    onSuccess: () => {
      router.push('/')
    },
    onError: () => {
      console.log('Error logging in.')
    },
  })

  const handleLogin = () => {
    login({
      email,
      password,
    })
  }

  return (
    <div className='flex w-56 flex-col bg-purple-700 p-5'>
      {isLoading ? (
        <p className='text-white'>Loading...</p>
      ) : data?.email?.length ? (
        <p className='text-white'>Logged in.</p>
      ) : (
        <div className='mb-5 flex w-full flex-col gap-1'>
          <input
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='w-full rounded-md border-[1px] border-white py-2'
          />

          <input
            type='password'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='w-full rounded-md border-[1px] border-white py-2'
          />
        </div>
      )}

      <div className='flex flex-col gap-2'>
        <button
          onClick={handleLogin}
          className='rounded-md bg-white py-2 text-purple-700'
        >
          Login
        </button>

        <div>
          <p>Don't have an account?</p>

          <Link href='/register'>Register</Link>
        </div>
      </div>
    </div>
  )
}
