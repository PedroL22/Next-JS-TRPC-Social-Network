import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { supabase } from '@/server/supabase/client'
import { cookies } from 'next/headers'
import { z } from 'zod'

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async (opts) => {
      return await supabase.auth.signUp({
        email: opts.input.email,
        password: opts.input.password,
        // options: {
        //   emailRedirectTo: `${requestUrl.origin}/auth/callback`,
        // },
      })
    }),

  login: publicProcedure.input(z.object({ email: z.string().email(), password: z.string() })).mutation(async (opts) => {
    return await supabase.auth.signInWithPassword({
      email: opts.input.email,
      password: opts.input.password,
    })
  }),

  logout: publicProcedure.mutation(async () => {
    const authCookies = cookies()
      .getAll()
      .filter((cookie) => cookie.name.includes('auth-token'))

    if (authCookies.length) {
      return authCookies.forEach((cookie) => cookies().delete(cookie.name))
    }
  }),

  userData: publicProcedure.query(async () => {
    return (await supabase.auth.getUser()).data.user
  }),
})
