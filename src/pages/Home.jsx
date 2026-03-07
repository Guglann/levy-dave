import AlbumCard from "../components/AlbumCard"

const albums = [
    {
        id: "1",
        title: "LOFI collection",
        image: "./albums/lofi-collection.jpg",
        description: "A study of isolation through monochrome textures."
    },
    {
        id: "2",
        title: "Miniatures Collection",
        image: "./albums/miniatures-collection.jpg",
        description: "Urban shadows and abstract geometry."
    },
    {
        id: "3",
        title: "Szumotron's Saga",
        image: "./albums/szumotron-saga.jpg",
        description: "Minimal compositions exploring silence."
    }
]

export default function Home() {
    return (
            <div className="container mx-auto px-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                    {albums.map(album => (
                        <AlbumCard key={album.id} album={album} />
                    ))}

                </div>

            </div>
    )
}