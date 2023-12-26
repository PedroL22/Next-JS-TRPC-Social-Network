'use client'

import { api } from '@/trpc/react'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { data, isLoading } = api.auth.userData.useQuery()
  const { mutate: register } = api.auth.register.useMutation({
    onSuccess: () => {
      location.reload()
    },
    onError: () => {
      console.log('Error registering user.')
    },
  })
  const { mutate: login } = api.auth.login.useMutation({
    onSuccess: () => {
      location.reload()
    },
    onError: () => {
      console.log('Error logging in.')
    },
  })
  const { mutate: logout } = api.auth.logout.useMutation({
    onSuccess: () => {
      location.reload()
    },
    onError: () => {
      console.log('Error logging out.')
    },
  })

  const handleRegister = () => {
    register({
      email,
      password,
    })
  }

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
        {isLoading ? (
          <p className='text-white'>Loading...</p>
        ) : data?.email?.length ? (
          <button
            onClick={() => logout()}
            className='rounded-df bg-white py-2 text-purple-700'
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={handleRegister}
              className='rounded-md bg-white py-2 text-purple-700'
            >
              Register
            </button>

            <button
              onClick={handleLogin}
              className='rounded-md bg-white py-2 text-purple-700'
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  )
}
