import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header className="flex justify-center p-5 border-b border-white/10">

            <Link to="/">
                <img
                    src="/logo.png"
                    alt="Levy Dave"
                    className="h-10 w-auto object-contain"
                />
            </Link>

        </header>
    )
}