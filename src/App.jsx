import {Routes, Route, HashRouter, Navigate} from "react-router-dom"
import Home from "./pages/Home"
import Album from "./pages/Album"
import CenteredLayout from "./components/CenteredLayout.jsx";
import {useAsync} from "react-use";
import {contentRepository} from "./utils/ApiContentRepository.js";

export default function App() {

    const pageDataRequest = useAsync(async () => {
        return contentRepository.getPageData();
    }, [])

    if (pageDataRequest.loading === true) {
        return <></>;
    }

    const pageData = pageDataRequest.value;

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/pl" replace />} />

                <Route path="/:languageIso" element={<CenteredLayout pageData={pageData}/>}>
                    <Route path="" element={<Home pageData={pageData}/>}/>
                    <Route path="album/:id" element={<Album pageData={pageData}/>}/>
                </Route>
            </Routes>
        </HashRouter>
    )
}