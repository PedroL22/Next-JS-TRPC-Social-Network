import { api } from '@/trpc/server'

import { Post, PostTextArea } from '@/app/_components/Home'

export default async function Home() {
  const postsData = await api.post.getAll.query()
  const userData = await api.auth.userData.query()

  return (
    <main className='mx-auto w-full max-w-screen-sm bg-gray-200 p-4 pt-5'>
      {userData?.id && <PostTextArea />}

      <div className='w-full'>
        {!!postsData.length &&
          postsData.map((post) => (
            <Post
              key={post.id}
              author_id={post.author_id}
              text={post.text}
            />
          ))}
      </div>
    </main>
  )
}
