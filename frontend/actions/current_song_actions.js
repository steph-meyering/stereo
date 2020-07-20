export const SELECT_SONG = "SELECT_SONG";
export const PLAY_PAUSE_SONG = "PLAY_PAUSE_SONG";
export const SEEK = "SEEK";

export const selectSong = song => ({
    type: SELECT_SONG,
    song
})

export const playPauseSong = () => ({
    type: PLAY_PAUSE_SONG
})

export const seek = () => ({
    type: SEEK
})