import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"

const BreadcrumbsSection = ({ title, description }: { title: string, description: string }) => {
    return (
        <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                            {description}
                        </p>
                    )}
                    <Breadcrumb className="mt-8 flex justify-center">
                        <BreadcrumbList>

                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="text-gray-300">
                                    Home
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink className="text-white">
                                    {title}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
        </section>
    );
};

export default BreadcrumbsSection;