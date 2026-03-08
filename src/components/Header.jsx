import {useLocation, useNavigate} from "react-router-dom";
import LanguageSelector from "./LanguageSelector.jsx";
import {config} from "../data/config.js";

export default function Header({languageIso}) {

    const navigate = useNavigate();
    const location = useLocation();

    const onLanguageChange = (newIso) => {
        const currentPath = location.pathname.split('/').slice(2).join('/');

        navigate(`/${newIso}/${currentPath}`);
    }

    return (
        <header className="flex justify-center p-5 border-b border-white/10">

            <div className={"flex-grow"}></div>

            <div>
                <a href={"https://linktr.ee/levydave"}>
                    <img
                        src="./logo.png"
                        alt="Levy Dave"
                        className="h-10 w-auto object-contain"
                    />
                </a>
            </div>

            <div className={"flex-grow flex justify-end"}>
                <LanguageSelector languages={config.languages} onSelect={onLanguageChange} initialValue={languageIso}/>
            </div>

        </header>
    )
}