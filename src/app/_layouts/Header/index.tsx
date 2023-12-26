'use client'

import Link from 'next/link'
import { type FC } from 'react'

import { api } from '@/trpc/react'

import { useToast } from '@/app/_hooks'

export const Header: FC = () => {
  const { data, isLoading } = api.auth.userData.useQuery()
  const { mutate: logout } = api.auth.logout.useMutation({
    onSuccess: () => {
      location.reload()
    },
    onError: ({ message }) => {
      useToast(message || 'Error logging out.', 'error')
    },
  })

  return (
    <header className='flex h-24 w-screen justify-center bg-purple-600 text-white'>
      <nav className='flex w-full max-w-screen-2xl items-center justify-between px-10 text-lg'>
        <Link
          href='/'
          className='cursor-pointer'
        >
          Home
        </Link>

        {isLoading ? (
          <p className='cursor-pointer'>Loading...</p>
        ) : data?.email ? (
          <div className='flex gap-3'>
            <p className='cursor-pointer'>{data?.email}</p>

            <p
              onClick={() => logout()}
              className='cursor-pointer'
            >
              Logout
            </p>
          </div>
        ) : (
          <Link
            href='/login'
            className='cursor-pointer'
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  )
}
