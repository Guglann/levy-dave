import type { AlbumProductSubtype } from "../types";

export class AlbumProductData {
	constructor(private base: AlbumProductSubtype) {}

	getTracks(): string[] {
		return this.base.fields.tracks?.pl ?? [];
	}
}
