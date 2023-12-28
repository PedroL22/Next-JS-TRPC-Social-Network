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
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-1 rounded-xl'
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='What do you want to talk about?'
        className='resize-none rounded-xl border-[1px] border-purple-700 p-3 outline-none'
      />

      <button
        type='submit'
        className='w-32 rounded-md bg-purple-700 p-3 font-bold text-white transition-all ease-in hover:bg-purple-800'
      >
        Submit
      </button>
    </form>
  )
}
