export const fetchSong = songId => (
    $.ajax({
        method: 'GET',
        url: `/api/songs/${songId}`
    })
)