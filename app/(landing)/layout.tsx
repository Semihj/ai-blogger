import React from 'react'
import Navbar from './_components/navbar'

export default function LandingLayout({children}:{children:React.ReactNode}) {
  return (
    <div className='w-full min-h-full flex flex-col' >
      <Navbar/>
      {children}
      </div>
  )
}
