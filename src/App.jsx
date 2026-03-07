import {Routes, Route, MemoryRouter} from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Album from "./pages/Album"

export default function App() {
    return (
        <MemoryRouter>
            <div className="min-h-screen bg-black text-white">
                <Header/>

                <main className="py-16">

                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/album/:id" element={<Album/>}/>
                    </Routes>

                </main>

            </div>
        </MemoryRouter>
    )
}