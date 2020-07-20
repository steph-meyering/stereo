export const SELECT_SONG = "SELECT_SONG";
export const PLAY_PAUSE_SONG = "PLAY_PAUSE_SONG";
export const SEEK = "SEEK";
export const SEEK_CLEAR = "SEEK_CLEAR";

export const selectSong = song => ({
    type: SELECT_SONG,
    song
})

export const playPauseSong = () => ({
    type: PLAY_PAUSE_SONG
})

export const seek = (origin, position) => ({
    type: SEEK,
    origin,
    position
})

export const seekClear = () => ({
  type: SEEK_CLEAR,
});