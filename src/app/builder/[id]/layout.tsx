import Navbar from '@/components/Navbar'
import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className='my-[75px]'>{children}</main>
    </div>
  )
}

export default Layout