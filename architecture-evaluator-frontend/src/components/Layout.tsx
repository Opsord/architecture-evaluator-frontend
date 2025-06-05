import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background-light via-bright-turquoise-50 to-background-dark">
            <Navbar />
            <main className="flex-1 flex justify-center items-start px-4 py-8">
                <div className="w-full max-w-6xl">{children}</div>
            </main>
            <Footer />
        </div>
    )
}