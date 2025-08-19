export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="p-3 display flex justify-center gap-1 text-gray-600 text-sm">
            <p>© {year} Built by</p>
            <a className="text-blue-600 hover:underline">Levi Girotto</a>
        </footer>
    )
}
