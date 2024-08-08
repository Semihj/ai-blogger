import ConvexClientProvider from '@/providers/convexClientProvider'
import React from 'react'

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <ConvexClientProvider>
        {children}
    </ConvexClientProvider>
  )
}
