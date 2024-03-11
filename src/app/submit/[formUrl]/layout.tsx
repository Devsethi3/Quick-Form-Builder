import ThemeSwitcher from '@/components/ui/ThemeSwitcher'
import Link from 'next/link'
import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {

    return (
        <div>
            <div className="flex items-center justify-between border-b px-9 py-4">
                <Link href="/">
                    <h2 className="font-bold text-2xl">PAGEFORM</h2>
                </Link>
                <ThemeSwitcher />
            </div>
            <main className='min-h-[90vh]'>{children}</main>
        </div>
    )
}

export default Layout