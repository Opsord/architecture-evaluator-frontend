import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="bg-bright-turquoise-50 flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}