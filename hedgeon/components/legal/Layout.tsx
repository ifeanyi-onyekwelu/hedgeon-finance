// components/legal/Layout.tsx
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export const LegalLayout = ({
    title,
    subtitle,
    children
}: {
    title: string
    subtitle: string
    children: React.ReactNode
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Back to Home
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16 mb-8 transition-all hover:shadow-2xl">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
                        <p className="text-xl text-gray-600">{subtitle}</p>
                    </div>

                    <div className="prose prose-lg max-w-3xl mx-auto text-gray-600">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}