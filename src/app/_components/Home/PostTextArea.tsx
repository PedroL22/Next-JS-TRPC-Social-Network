'use client'

import { useRouter } from 'next/navigation'
import { useState, type FC, type FormEvent } from 'react'

import { api } from '@/trpc/react'

import { useToast } from '@/app/_hooks'

export const PostTextArea: FC = () => {
  const [text, setText] = useState('')
  const { data: userData } = api.auth.userData.useQuery()

  const router = useRouter()

  const { mutate: createPost } = api.post.create.useMutation({
    onSuccess: () => {
      setText('')
      router.refresh()
    },
    onError: ({ message }) => {
      useToast(message || 'Error creating post.', 'error')
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!userData?.id) {
      return useToast('User not logged in.', 'error')
    }

    return createPost({
      userId: userData.id,
      text,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='What do you want to talk about?'
        className='border-2 border-purple-700 p-10'
      />

      <button
        type='submit'
        className='bg-purple-700 font-bold text-white transition-all ease-in hover:bg-purple-700'
      >
        Submit
      </button>
    </form>
  )
}
