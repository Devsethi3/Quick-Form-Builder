import Navbar from '@/components/ui/Navbar'
import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    )
}

export default Layout