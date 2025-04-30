import { LockIcon } from 'lucide-react'
import Link from 'next/link'

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center
                transform transition-all duration-300 hover:shadow-xl relative
                border border-gray-200/60 backdrop-blur-sm">
                <div className="flex justify-center mb-6 animate-bounce">
                    <div className="bg-red-100 p-4 rounded-full relative
                        before:absolute before:-inset-2 before:border-2 before:border-red-100/50 before:rounded-full">
                        <LockIcon className="h-12 w-12 text-red-600 animate-pulse" />
                    </div>
                </div>

                <h1 className="text-4xl font-extrabold text-gray-900 mb-3
                    bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                    401 Unauthorized
                </h1>

                <p className="text-gray-600 mb-8 text-lg sm:text-xl
                    leading-relaxed max-w-[85%] mx-auto">
                    You don't have permission to access this resource. Please
                    verify your credentials or contact your administrator.
                </p>

                <div className="flex flex-col gap-4 items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center px-6 py-3 border border-transparent
                            text-base font-semibold rounded-xl text-white bg-red-500 hover:bg-red-600
                            transition-all duration-300 transform hover:-translate-y-0.5
                            shadow-md hover:shadow-red-200/50 active:translate-y-0
                            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Return to Home
                    </Link>

                    <Link
                        href="/auth/login"
                        className="text-sm font-medium text-red-600 hover:text-red-700
                            transition-colors duration-200 group"
                    >
                        Try different account?{' '}
                        <span className="inline-block group-hover:translate-x-0.5 transition-transform">
                            →
                        </span>
                    </Link>
                </div>
            </div>

            <p className="mt-8 text-center text-gray-500 text-sm
                hover:text-gray-600 transition-colors duration-200">
                Need elevated access?{' '}
                <a
                    href="mailto:support@example.com"
                    className="font-semibold text-red-600 hover:text-red-700
                        underline underline-offset-4 decoration-red-100/50 hover:decoration-red-200
                        transition-all duration-300"
                >
                    Request authorization
                </a>
            </p>
        </div>
    )
}