
export const config = {
    albums: [
        {
            id: "lo-fi-collection",
            title: "Lo-Fi collection",
            image: "./albums/lofi-collection.jpg",
            descriptionTranslationId: "album.description.loFiCollection",
            isAvailableForPurchase: true,
            tracks: [
                {
                    name: "Something"
                },
                {
                    name: "Something 2"
                },
                {
                    name: "Something 2"
                }
            ]
        }
    ],
    languages: [
        {
            id: 1,
            iso: 'pl',
            name: 'PL'
        },
        {
            id: 2,
            iso: 'en',
            name: 'EN'
        }
    ],
    translations: {
        tracks: {
            pl: "Utwory",
            en: "Tracks"
        },
        orderAction: {
            pl: "Zamów przez Google Forms",
            en: "Order by Google Forms"
        },
        "album.description.loFiCollection": {
            pl: "Lo-Fi Collection po polsku",
            en: "Lo-Fi Collection in english",
        },
        goBack: {
            pl: "Wróć",
            en: "Back",
        }
    },
    purchaseFormUrl: "https://www.test.pl"
}