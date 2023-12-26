'use client'

import { type FC, type ReactNode } from 'react'

import { SnackbarProvider } from 'notistack'

type MainClientWrapperProps = {
  children: ReactNode
}

export const MainClientWrapper: FC<MainClientWrapperProps> = ({ children }) => {
  return (
    <>
      <SnackbarProvider />

      {children}
    </>
  )
}
