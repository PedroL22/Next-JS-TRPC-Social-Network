'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'

import { api } from '@/trpc/react'

import { useToast } from '@/app/_hooks'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { mutate: loginMutation } = api.auth.login.useMutation({
    onSuccess: () => {
      location.replace('/')
    },
    onError: ({ message }) => {
      useToast(message || 'Error logging in.', 'error')
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    return loginMutation({
      email,
      password,
    })
  }

  return (
    <div className='mx-auto mt-20 flex w-11/12 flex-col rounded-xl border-[1px] border-purple-700 p-5 shadow-xl md:w-80'>
      <h1 className='text-center text-2xl font-bold text-purple-700'>Login</h1>

      <form onSubmit={handleSubmit}>
        <div className='flex w-full flex-col gap-1'>
          <fieldset>
            <label
              htmlFor='email'
              className='text-sm text-purple-700'
            >
              E-mail
            </label>

            <input
              id='email'
              name='email'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder='Enter your e-mail'
              className='w-full rounded-md border-[1px] border-purple-700 p-2 outline-none'
            />
          </fieldset>

          <fieldset>
            <label
              htmlFor='password'
              className='text-sm text-purple-700'
            >
              Password
            </label>

            <input
              id='password'
              name='password'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder='Enter your password'
              className='w-full rounded-md border-[1px] border-purple-700 p-2 outline-none'
            />
          </fieldset>
        </div>

        <button
          type='submit'
          className='mt-3 w-full rounded-md bg-purple-700 p-2 font-bold text-white transition-all ease-in hover:bg-purple-800'
        >
          Login
        </button>
      </form>

      <div className='mt-3 flex gap-1 text-sm text-purple-700'>
        <p>Don't have an account?</p>

        <Link
          href='/register'
          className='font-bold hover:underline'
        >
          Register
        </Link>
      </div>
    </div>
  )
}
