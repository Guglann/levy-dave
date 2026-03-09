import Header from "./Header.jsx";
import {Outlet, useParams} from "react-router-dom";

export default function CenteredLayout({pageData}) {

    const {languageIso} = useParams();

    return <>
        <div className="min-h-screen bg-black text-white">
            <Header languageIso={languageIso} logoSrc={pageData.config.logoSrc} languages={pageData.languages}/>

            <main className="py-16">
                <main className="max-w-6xl mx-auto">

                <Outlet languageIso={languageIso}/>
                </main>
            </main>
        </div>
    </>

}