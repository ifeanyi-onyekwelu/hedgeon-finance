import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash } from "lucide-react"
import Image from 'next/image'

interface BreadcrumbsSectionProps {
    title: string
    subtitle?: string
}

const BreadcrumbsSection = ({ title, subtitle }: BreadcrumbsSectionProps) => {
    return (
        <section className="relative py-16 md:py-28 overflow-hidden">

            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.jpg"
                    alt="Investment landscape"
                    layout="fill"
                    objectFit="cover"
                    className="brightness-90"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-primary/30" />
            </div>

            <div className="relative container mx-auto px-4 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-2 text-lg opacity-90">
                        {subtitle}
                    </p>
                )}

                <nav
                    aria-label="breadcrumb"
                    className="mt-6 inline-flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-5 py-2"
                >
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink>{title}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </nav>
            </div>
        </section>
    )
}

export default BreadcrumbsSection;
