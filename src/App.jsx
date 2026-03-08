import {Routes, Route, HashRouter, Navigate, useParams} from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Album from "./pages/Album"
import CenteredLayout from "./components/CenteredLayout.jsx";

export default function App() {

    return (
        <HashRouter>
            <Routes>

                <Route path="/" element={<Navigate to="/pl" replace />} />

                <Route path="/:languageIso" element={<CenteredLayout/>}>
                    <Route path="" element={<Home/>}/>
                    <Route path="album/:id" element={<Album/>}/>
                </Route>
            </Routes>
        </HashRouter>
    )
}