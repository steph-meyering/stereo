export const PLAY_NEXT = "PLAY_NEXT";
export const PLAY_PREVIOUS = "PLAY_PREVIOUS";
export const SHUFFLE = "SHUFFLE";
export const REPEAT_ONE = "REPEAT_ONE";
export const REPEAT_ALL = "REPEAT_ALL";

export const playNext = () => ({
  type: PLAY_NEXT,
})

export const playPrevious = () => ({
  type: PLAY_PREVIOUS,
});

export const shuffle = () => ({
  type: SHUFFLE,
});