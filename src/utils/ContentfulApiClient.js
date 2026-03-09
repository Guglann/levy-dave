class ContentfulApiClient {
    constructor(environment, baseUrl, spaceId, token) {
        this.environment = environment;
        this.baseUrl = baseUrl;
        this.spaceId = spaceId;
        this.token = token;
    }


    async getSpaceEntriesByType(contentType) {
        return await this.makeRequest(
            'GET',
            `/spaces/${this.spaceId}/environments/${this.environment}/entries?access_token=${this.token}&content_type=${contentType}&locale=*`,
        )
    }

    async getSpace() {
        return await this.makeRequest(
            'GET',
            `/spaces/${this.spaceId}?access_token=${this.token}`,
        )
    }

    async makeRequest(method, url) {
        const response = await fetch(
            this.baseUrl+url,
            {
                method
            }
        )

        return await response.json();
    }
}

export const contentfulApiClient = new ContentfulApiClient(
    'master',
    'https://cdn.contentful.com',
    's0gx44xxmrcg',
    'KWUJeOVdnN909Pxn0O-5R47BKIZs6HRLAytOMvXJiQ0'
);