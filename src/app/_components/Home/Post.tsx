import { type FC } from 'react'

type PostProps = {
  author_id: string
  text: string
}

export const Post: FC<PostProps> = ({ author_id, text }) => {
  return (
    <div className='rounded-xl bg-white p-5 shadow-md'>
      <p>{author_id}</p>
      <p>{text}</p>
    </div>
  )
}
