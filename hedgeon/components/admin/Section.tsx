import React from 'react'

function Section({ children }: { children: React.ReactNode }) {
    return (
        <section className="p-6 space-y-6">
            {children}
        </section>
    )
}

export default Section
