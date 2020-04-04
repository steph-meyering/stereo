export const fetchSong = songId => (
    $.ajax({
        method: 'GET',
        url: `/api/songs/${songId}`
    })
)

export const fetchSongs = () => {
    return (
        $.ajax({
            method: 'GET',
            url: `/api/songs`
        })
    )  
} 

export const uploadSong = song => (
    $.ajax({
        method: 'POST',
        url: `/api/songs`,
        data: song ,
        contentType: false,
        processData: false
    })
)
