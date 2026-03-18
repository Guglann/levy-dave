import { del, get, set } from "idb-keyval";

export class IdbStorage {
	constructor(private readonly space: string) {}

	async store(key: string, data: string, ttlSeconds?: number) {
		const spaceKey = this.createSpaceKey(key);

		const expiresAt = ttlSeconds
			? new Date(Date.now() + ttlSeconds * 1000)
			: null;

		const storableData = {
			content: data,
			expiresAt,
		};

		await set(spaceKey, JSON.stringify(storableData));
	}

	async retrieve(key: string) {
		const spaceKey = this.createSpaceKey(key);

		const rawData = await get(spaceKey);

		if (!rawData) return null;

		const parsedData: { content: string; expiresAt: string | null } =
			JSON.parse(rawData);

		const now = new Date();

		const expiresAt = parsedData.expiresAt
			? new Date(parsedData.expiresAt)
			: null;

		if (expiresAt && now > expiresAt) {
			await this.remove(spaceKey);
			return null;
		}

		return parsedData.content;
	}

	async remove(key: string) {
		const spaceKey = this.createSpaceKey(key);

		await del(spaceKey);
	}

	private createSpaceKey(key: string): string {
		return `${this.space}.${key}`;
	}
}
