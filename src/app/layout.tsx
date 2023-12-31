import '@/styles/globals.css'

import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'

import { TRPCReactProvider } from '@/trpc/react'

import { Header } from './_layouts/Header'
import { MainClientWrapper } from './_layouts/MainClientWrapper'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'Next JS TRPC Social Network',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <MainClientWrapper>
            <Header />

            {children}
          </MainClientWrapper>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
