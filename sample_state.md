```javascript
{
    entities: {
        users: {
            1: {
                id: 1,
                username: 'Steph',
                location: 'San Francisco',
                artist: false,
                about: "I'm building this 🤓!",
                repostedSongs: [1,2,3],
                ownedSongs:
            }
            2: {
                id: 2,
                username: 'Thylacine',
                location: 'Paris',
                artist: true,
                about: "Writing music from a mobile studio while traveling through South America"
                repostedSongs: [1,2,3]

            }
        }
        songs: {
            1: {
                id: 1,
                artistId: 2,
                songName: 'Purmamarca',
                genre: "Electronica",
            }
            2: {
                id: 2,
                artistId: 2,
                songName: 'Mountains',
                genre: "Electronica",
            }
        }
        comments: {
            1: {
                id: 1,
                authorId: 2,
                songId: 1,
                songTimestamp: 103, //integer is second at which comment is posted (ie: 1:42)
                genre: "glad you like it!",
            }
            2: {
                id: 2,
                authorId: 1,
                songId: 1,
                songTimestamp: 97, //integer is second at which comment is posted (ie: 1:42)
                genre: "wow this song is so amazing!",
            }
        }
        reposts: {
            1: {
                id: 1,
                userId: 1,
                songId: 2,
                createdAt: 1529644667834,
            }
            1: {
                id: 2,
                userId: 1,
                songId: 1,
                createdAt: 1529644463834,
            }
        }
    },
    ui: {},
    errors: {
        error1: ["error text"],
        error2: ["more error text"],
        },
    session: { currentUserId: 1 },
}
```