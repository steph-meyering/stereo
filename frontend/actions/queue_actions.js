export const PLAY_NEXT = "PLAY_NEXT";
export const PLAY_PREVIOUS = "PLAY_PREVIOUS";
export const SHUFFLE = "SHUFFLE";
export const REPEAT_ONE = "REPEAT_ONE";
export const REPEAT_ALL = "REPEAT_ALL";
export const SET_QUEUE = "SET_QUEUE";
export const ADD_TO_QUEUE = "ADD_TO_QUEUE";
export const REMOVE_FROM_QUEUE = "REMOVE_FROM_QUEUE";
export const CLEAR_QUEUE = "CLEAR_QUEUE";
export const REORDER_QUEUE = "REORDER_QUEUE";

export const playNext = () => ({
  type: PLAY_NEXT,
})

export const playPrevious = () => ({
  type: PLAY_PREVIOUS,
});

export const shuffle = () => ({
  type: SHUFFLE,
});

export const setQueue = (queue) => ({
  type: SET_QUEUE,
  queue,
});

export const addToQueue = (song) => ({
  type: ADD_TO_QUEUE,
  song,
});

export const removeFromQueue = (songId) => ({
  type: REMOVE_FROM_QUEUE,
  songId,
});

export const clearQueue = () => ({
  type: CLEAR_QUEUE,
});

export const reorderQueue = (fromIndex, toIndex) => ({
  type: REORDER_QUEUE,
  fromIndex,
  toIndex,
});