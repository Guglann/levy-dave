class LocalStorageClient {
    persist(key, data, ttlSeconds) {
        const expiresAt = new Date(Date.now() + (ttlSeconds * 1000));

        const dataToCache = {
            expiresAt: expiresAt,
            value: data
        }

        localStorage.setItem(key, JSON.stringify(dataToCache))
    }

    get(key) {
        const item = localStorage.getItem(key);

        if (!item) {
            return null;
        }

        const rawData = JSON.parse(item);

        const expiresAt = new Date(rawData.expiresAt);
        const now = new Date();

        if (now > expiresAt) {
            localStorage.removeItem(key);
            return null;
        }

        return rawData.value;
    }
}

export const localStorageClient = new LocalStorageClient();