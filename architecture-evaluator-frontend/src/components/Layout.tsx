import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar section */}
            <div>
                <Navbar />
            </div>
            {/* Main content section */}
            <div className="flex turquoise-50">
                <main className="container max-w-4xl h-5/6 mx-auto py-8">
                    {children}
                </main>
            </div>
            {/* Footer section */}
            <div>
                <Footer />
            </div>
        </div>
    )
}

