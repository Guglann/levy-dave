import {useParams} from "react-router-dom"
import {motion} from "framer-motion"
import ActionButton from "../components/ActionButton.jsx";

export default function Album({pageData}) {

    const {languageIso, id} = useParams();

    const album = pageData.albums.find(a => a.id === id);

    return (

        <div>
            <div className="mb-6">
                <ActionButton
                    text={pageData.translations.backButton[languageIso]}
                    linkUrl={`/${languageIso}`}
                    variantId={"ghost"}
                />
            </div>
            <div className="grid grid-cold-1 md:grid-cols-2 gap-8">
                <div>
                    <motion.img
                        initial={{opacity: 0, scale: 0.95}}
                        animate={{opacity: 1, scale: 1}}
                        src={album.coverSrc}
                        className="w-full mb-10"
                    />
                </div>
                <div>
                    <h1 className="text-2xl mb-4">{album.title}</h1>

                    <div className="text-lg text-white/70 leading-relaxed mb-6"
                         dangerouslySetInnerHTML={{__html: album.description[languageIso]}}/>

                    {album.tracks.length && <>

                        <h3 className="text-xl mb-2">Tracks</h3>
                        <ol className="list-decimal list-inside mb-12 text-lg">
                            {album.tracks.map(track =>
                                <li key={track.name} className="text-white/70">{track.name}</li>
                            )}
                        </ol>
                    </>}

                    <div>
                        <ActionButton
                            text={pageData.translations.orderButton[languageIso]}
                            linkUrl={pageData.config.purchaseFormUrl}
                            variantId={"primary"}
                            isDisabled={!album.isAvailableForPurchase}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}