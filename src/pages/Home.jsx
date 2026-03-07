import AlbumCard from "../components/AlbumCard"
import { albums } from "../data/albums.js"

export default function Home() {

    const folders2 = [
        {
            id: "10",
            title: "LOFI collection 2",
            image: "./albums/lofi-collection.jpg",
            description: "A study of isolation through monochrome textures."
        },
    ];

    return (
            <div className="container mx-auto px-6">

                {folders2.map(folder => <div>{folder.title}</div>)}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                    {albums.map(album => (
                        <AlbumCard key={album.id} album={album} />
                    ))}

                </div>

            </div>
    )
}