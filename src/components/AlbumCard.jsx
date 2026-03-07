import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function AlbumCard({ album }) {

    return (
        <Link to={`/album/${album.id}`}>

            <motion.div
                whileHover={{ scale: 1.04 }}
                className="relative group cursor-pointer bg-black"
            >

                {/* Image container */}
                <div className="w-full aspect-square flex items-center justify-center p-6">

                    <img
                        src={album.image}
                        alt={album.title}
                        className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105"
                    />

                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 opacity-0 group-hover:opacity-100 transition">

                    <h2 className="text-2xl tracking-wide">
                        {album.title}
                    </h2>

                </div>

            </motion.div>

        </Link>
    )
}