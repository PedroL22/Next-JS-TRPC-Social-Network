import { PostTextArea } from '@/app/_components/Home'

import { api } from '@/trpc/server'

export default async function Home() {
  const postsData = await api.post.getAll.query()
  const userData = await api.auth.userData.query()

  return (
    <main className='mx-auto w-full max-w-screen-sm bg-gray-200'>
      {userData?.id && <PostTextArea />}

      {postsData[0] && <pre>{JSON.stringify(postsData, null, 2)}</pre>}
    </main>
  )
}
