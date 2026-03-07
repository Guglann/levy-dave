import AlbumCard from "../components/AlbumCard"
import {albums} from "../data/albums"

export default function Home() {

    return (
        <div className="container mx-auto px-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                {albums.map(album => (
                    <AlbumCard key={album.id} album={album}/>
                ))}

            </div>

        </div>
    )
}