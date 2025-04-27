import Link from "next/link";
import Image from "next/image";

interface BreadcrumbsProps {
    title: string;
    description?: string;
}

function BreadcrumbsSection({ title, description }: BreadcrumbsProps) {
    return (
        <section className="relative h-[50vh] w-full overflow-hidden">
            {/* Background with overlay */}
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

            <div className="relative z-10 h-full flex items-center">
                <div className="max-w-6xl mx-auto px-4 xl:px-0 w-full flex items-center justify-end">
                    <div className="max-w-2xl space-y-8 text-end flex flex-col items-end">
                        {/* Subheading with decorative line */}
                        <div className="flex items-center justify-end gap-4">
                            <div className="w-12 h-0.5 bg-primary" />
                            <p className="text-lg md:text-4xl font-semibold tracking-wide text-primary">
                                {title}
                            </p>
                        </div>

                        <p className="text-xl md:text-2xl text-gray-200 leading-relaxed md:w-5/6">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BreadcrumbsSection;