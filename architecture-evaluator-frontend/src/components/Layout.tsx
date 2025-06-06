import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-background-light via-bright-turquoise-50 to-background-dark overflow-hidden">
            <Navbar />
            <main className="flex-1 flex flex-col items-stretch justify-stretch overflow-hidden">
                {children}
            </main>
            <Footer />
        </div>
    )
}