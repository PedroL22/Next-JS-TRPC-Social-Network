import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { supabase } from '@/server/supabase/client'
import { z } from 'zod'

import { type PostEntity } from '@/entities/PostEntities'

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    } else return data as PostEntity[]
  }),

  getById: publicProcedure.input(z.object({ postId: z.number() })).query(async (opts) => {
    const { data, error } = await supabase.from('posts').select('*').eq('id', opts.input.postId)

    if (error) {
      throw new Error(error.message)
    } else return data[0] as PostEntity
  }),

  getByUserId: publicProcedure.input(z.object({ userId: z.string() })).query(async (opts) => {
    const { data, error } = await supabase.from('posts').select('*').eq('author_id', opts.input.userId)

    if (error) {
      throw new Error(error.message)
    } else return data as PostEntity[]
  }),

  create: publicProcedure.input(z.object({ userId: z.string(), text: z.string() })).mutation(async (opts) => {
    const { error } = await supabase.from('posts').insert({ author_id: opts.input.userId, text: opts.input.text })

    if (error) {
      throw new Error(error.message)
    } else return 'Post created successfully.'
  }),

  delete: publicProcedure.input(z.object({ postId: z.number() })).mutation(async (opts) => {
    const { error } = await supabase.from('posts').delete().eq('id', opts.input.postId)

    if (error) {
      throw new Error(error.message)
    } else return 'Post deleted successfully.'
  }),

  edit: publicProcedure.input(z.object({ postId: z.number(), text: z.string() })).mutation(async (opts) => {
    const { error } = await supabase.from('posts').update({ text: opts.input.text }).eq('id', opts.input.postId)

    if (error) {
      throw new Error(error.message)
    } else return 'Post edit successfully.'
  }),
})
