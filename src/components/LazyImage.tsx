import {useAsync} from "react-use";
import {assetCache} from "../services/AssetCache";

type Props = {
    url: string
    alt: string
    classNames: string[]
}

export default function LazyImage({alt, url, classNames = []}: Props) {
    const sourceRequest = useAsync(async () => {
        return assetCache.getAssetSource(url);
    }, []);

    if (sourceRequest.loading) {
        return;
    }

    const source = sourceRequest.value;

    if (!source) {
        return;
    }

    return (
        <img
            src={source}
            alt={alt}
            className={classNames.join(' ')}
        />
    )
}