import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen w-full text-center">
                <svg
                    className="mx-auto animate-bounce"
                    fill="none"
                    height="150"
                    viewBox="0 0 24 24"
                    width="150"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10 5.52 0 10-4.48 10-10 0-5.52-4.48-10-10-10zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"
                        fill="currentColor"
                    />
                </svg>
                <div className="max-w-md w-full mx-auto space-y-4">
                    <h1 className="text-3xl font-bold">404 Not Found</h1>
                    <p className="text-gray-500 dark:text-gray-400">Sorry, we couldn't find the page you're looking for.</p>
                    <Link href="/">
                        <Button>Go Back Home</Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NotFoundPage