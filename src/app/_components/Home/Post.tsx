import { type FC } from 'react'

import { formatDate } from '@/app/_utils'

type PostProps = {
  author_id: string
  text: string
  date: string
}

export const Post: FC<PostProps> = ({ author_id, text, date }) => {
  const formattedDate = formatDate(date)

  return (
    <div className='flex flex-col space-y-5 rounded-xl bg-white p-5 shadow-md'>
      <div className='flex items-center justify-between'>
        <p>{author_id}</p>

        <p className='text-gray-500'>{formattedDate}</p>
      </div>

      <p>{text}</p>
    </div>
  )
}
