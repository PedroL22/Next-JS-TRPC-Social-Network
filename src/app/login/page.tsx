'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

//import type { Database } from '@/lib/database.types'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient({
    supabaseUrl: String(process.env.NEXT_PUBLIC_SUPABASE_URL),
    supabaseKey: String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  })

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
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
          onClick={handleSignUp}
          className='rounded-md bg-white py-2 text-purple-700'
        >
          Sign up
        </button>

        <button
          onClick={handleSignIn}
          className='rounded-md bg-white py-2 text-purple-700'
        >
          Sign in
        </button>

        <button
          onClick={handleSignOut}
          className='rounded-df bg-white py-2 text-purple-700'
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
