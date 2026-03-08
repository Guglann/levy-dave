import {useParams} from "react-router-dom"
import {config} from "../data/config.js"
import {motion} from "framer-motion"
import {TranslationResolver} from "../utils/TranslationResolver.js";
import ActionButton from "../components/ActionButton.jsx";

export default function Album() {

    const {id, languageIso} = useParams()

    const translationResolver = new TranslationResolver(config);

    const album = config.albums.find(a => a.id === id)

    return (
        <div>
            <div className="mb-6">
                <ActionButton
                    text={translationResolver.resolve('goBack', languageIso)}
                    linkUrl={`/${languageIso}`}
                    variantId={"ghost"}
                />
            </div>
            <div className="grid grid-cold-1 md:grid-cols-2 gap-8">
                <div>
                    <motion.img
                        initial={{opacity: 0, scale: 0.95}}
                        animate={{opacity: 1, scale: 1}}
                        src={album.image}
                        className="w-full mb-10"
                    />
                </div>
                <div>
                    <h1 className="text-2xl mb-4">{album.title}</h1>

                    <p className="text-lg text-white/70 leading-relaxed mb-6">
                        {translationResolver.resolve(album.descriptionTranslationId, languageIso)}
                    </p>

                    {album.tracks.length && <>

                        <h3 className="text-xl mb-2">{translationResolver.resolve('tracks', languageIso)}</h3>
                        <ol className="list-decimal list-inside mb-12 text-lg">
                            {album.tracks.map(track =>
                                <li className="text-white/70">{track.name}</li>
                            )}
                        </ol>
                    </>}

                    <div>
                        <ActionButton
                            text={translationResolver.resolve('orderAction', languageIso)}
                            linkUrl={config.purchaseFormUrl}
                            variantId={"primary"}
                            isDisabled={!album.isAvailableForPurchase}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}