import { useParams } from "react-router-dom"
import { albums } from "../data/albums"
import { motion } from "framer-motion"

export default function Album() {

    const { id } = useParams()

    const album = albums.find(a => a.id === id)

    return (
        <main className="max-w-4xl mx-auto">

            <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={album.image}
                className="w-full mb-10"
            />

            <h1 className="text-4xl mb-6">{album.title}</h1>

            <p className="text-lg text-white/70 leading-relaxed">
                {album.description}
            </p>

        </main>
    )
}