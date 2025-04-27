import { IconBrandFacebook, IconBrandInstagram, IconBrandX, IconBrandYoutube } from "@tabler/icons-react"
import { AlarmClock, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import { cloneElement } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function Footer() {

    const contactInfo = [
        {
            icon: <Phone />,
            title: "Call Us",
            value: "(+62) 81 314 239"
        },
        {
            icon: <Mail />,
            title: "Email Us",
            value: "investmoon@domain.com"
        },
        {
            icon: <MapPin />,
            title: "Our Location",
            value: "Jalan Sunset Road No. 20"
        },
        {
            icon: <AlarmClock />,
            title: "Work Hours",
            value: "09:00 AM - 22:00 PM"
        },
    ]
    return (
        <footer className="bg-primary-fade pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 xl:px-0">
                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-gradient-to-r from-primary to-primary-dark mx-auto p-8 rounded-2xl shadow-xl relative -top-32">
                    {contactInfo.map(({ icon, title, value }, index) => (
                        <div key={index} className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300">
                            <div className="p-3 bg-white/20 rounded-lg">
                                {cloneElement(icon, { className: 'w-8 h-8 stroke-2' })}
                            </div>
                            <div className="ml-4">
                                <h4 className="text-sm font-medium text-white/80">{title}</h4>
                                <p className="text-lg font-semibold text-white">{value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-base">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-primary-dark">Hedgeon Finance</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Empowering your financial future with innovative solutions and expert guidance.
                        </p>
                        <div className="flex space-x-3">
                            {[IconBrandFacebook, IconBrandX, IconBrandInstagram, IconBrandYoutube].map((Icon, idx) => (
                                <Link
                                    key={idx}
                                    href="#"
                                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary-dark transition-colors"
                                >
                                    <Icon className="w-6 h-6" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {[
                        {
                            title: 'Quick Links',
                            links: [
                                { name: 'Home', href: '/' },
                                { name: 'About Us', href: '/about' },
                                { name: 'Services', href: '/services' },
                                { name: 'FAQ', href: '/faq' },
                                { name: 'Contact Us', href: '/contact-us' }
                            ]
                        },
                        {
                            title: 'Useful Links',
                            links: [
                                { name: 'Privacy Policy', href: '/privacy' },
                                { name: 'Terms', href: '/terms' },
                                { name: 'Disclaimer', href: '/disclaimer' },
                                { name: 'Support', href: '/support' }
                            ]
                        }
                    ].map((section, idx) => (
                        <div key={idx} className="space-y-6">
                            <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
                        <p className="text-muted-foreground">
                            Subscribe to our newsletter for financial insights and updates.
                        </p>
                        <form className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="rounded-full px-6 h-12 border-2 border-primary/20 focus-visible:ring-primary"
                            />
                            <Button
                                type="submit"
                                className="rounded-full h-12 px-8 bg-primary hover:bg-primary-dark hover:shadow-lg transition-all"
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Hedgeon Finance. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )

}

export default Footer
