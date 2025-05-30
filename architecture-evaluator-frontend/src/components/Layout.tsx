import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

type LayoutProps = {
    children: ReactNode
    noContainer?: boolean
}

export default function Layout({ children, noContainer }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-900">
            <Navbar />
            {noContainer ? (
                <main className="flex-1">{children}</main>
            ) : (
                <main className="container max-w-4xl mx-auto px-4 py-8 flex-1">
                    {children}
                </main>
            )}
            <Footer />
        </div>
    )
}