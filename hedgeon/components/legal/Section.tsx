const Section = ({ icon, title, children }: any) => (
    <section className="group border-l-4 border-indigo-100 pl-6 hover:border-indigo-200 transition-colors">
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-50 rounded-lg">{icon}</div>
            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        </div>
        {children}
    </section>
)

export default Section