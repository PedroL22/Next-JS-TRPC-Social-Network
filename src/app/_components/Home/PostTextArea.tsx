'use client'

import { useState, type FC, type FormEvent } from 'react'

import { api } from '@/trpc/react'

export const PostTextArea: FC = () => {
  const [text, setText] = useState('')
  const { data: userData } = api.auth.userData.useQuery()

  const { mutate: createPost } = api.post.create.useMutation({
    onSuccess: () => {
      setText('')
    },
    onError: () => {
      console.log('Error creating post.')
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!userData?.id) {
      return console.log('User not logged in.')
    }

    createPost({
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
