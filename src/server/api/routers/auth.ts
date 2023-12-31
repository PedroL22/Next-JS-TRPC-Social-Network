import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { supabase } from '@/server/supabase/client'
import { z } from 'zod'

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async (opts) => {
      const { data, error } = await supabase.auth.signUp({
        email: opts.input.email,
        password: opts.input.password,
        // options: {
        //   emailRedirectTo: `${requestUrl.origin}/auth/callback`,
        // },
      })

      if (error) {
        throw new Error(error.message)
      } else return data.session
    }),

  login: publicProcedure.input(z.object({ email: z.string().email(), password: z.string() })).mutation(async (opts) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: opts.input.email,
      password: opts.input.password,
    })

    if (error) {
      throw new Error(error.message)
    } else return data.session
  }),

  logout: publicProcedure.mutation(async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(error.message)
    }
  }),

  userData: publicProcedure.query(async () => {
    return (await supabase.auth.getUser()).data.user

    // const { data, error } = await supabase.auth.getUser()

    // if (error) {
    //   throw new Error(error.message)
    // } else return data.user
  }),
})
