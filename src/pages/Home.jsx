import AlbumCard from "../components/AlbumCard"
import {config} from "../data/config.js"
import {useParams} from "react-router-dom";

export default function Home() {

    const {languageIso} = useParams()

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

            {config.albums.map(album => (
                <AlbumCard key={album.id} album={album} languageIso={languageIso}/>
            ))}

        </div>
    )
}