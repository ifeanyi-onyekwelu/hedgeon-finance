const ListItem = ({ children }: any) => (
    <li className="flex items-start">
        <span className="shrink-0 mt-1 mr-3 text-indigo-600">•</span>
        {children}
    </li>
)

export default ListItem