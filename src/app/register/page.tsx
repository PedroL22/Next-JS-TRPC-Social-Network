'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { api } from '@/trpc/react'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const { mutate: register } = api.auth.register.useMutation({
    onSuccess: () => {
      router.push('/')
    },
    onError: () => {
      console.log('Error registering user.')
    },
  })

  const handleRegister = () => {
    register({
      email,
      password,
    })
  }

  return (
    <div className='flex w-56 flex-col bg-purple-700 p-5'>
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

      <div className='flex flex-col gap-2'>
        <button
          onClick={handleRegister}
          className='rounded-md bg-white py-2 text-purple-700'
        >
          Register
        </button>

        <div>
          <p>Already have an account?</p>

          <Link href='/login'>Login</Link>
        </div>
      </div>
    </div>
  )
}
