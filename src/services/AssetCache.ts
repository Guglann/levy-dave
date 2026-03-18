import {IdbStorage} from "./IdbStorage";

export class AssetCache {

    private readonly storage: IdbStorage;

    constructor() {
        this.storage = new IdbStorage('asset');
    }

    async getAssetSource(url: string): Promise<string>
    {
        const cachedAssedSource = await this.storage.retrieve(url);

        if (cachedAssedSource) {
            return cachedAssedSource;
        }

        const response = await fetch(url);
        const buffer = await response.arrayBuffer();

        const contentType = response.headers.get("content-type");

        if (!contentType) {
            throw new Error("Could not find content-type");
        }

        const base64 = btoa(
            new Uint8Array(buffer).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                "",
            ),
        );

        const assetSource = `data:${contentType};base64,${base64}`;

        await this.storage.store(
            url,
            assetSource,
            3600
        );

        return assetSource;
    }
}

export const assetCache = new AssetCache();