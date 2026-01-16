import { RECEIVE_SONGS } from "../actions/song_actions";
import { SELECT_SONG } from "../actions/current_song_actions";
import {
  PLAY_NEXT,
  PLAY_PREVIOUS,
  SHUFFLE,
  SET_QUEUE,
  ADD_TO_QUEUE,
  REMOVE_FROM_QUEUE,
  CLEAR_QUEUE,
  REORDER_QUEUE,
} from "../actions/queue_actions";
import { shuffle } from "lodash";

const initialState = {
  allSongs: null,
  queue: [],
  played: [],
  queueIds: [],
  playedIds: [],
  originalQueue: [],
  isShuffled: false,
};

const buildQueueFromIds = (ids, allSongs) =>
  ids
    .map((id) => allSongs[id])
    .filter((song) => song);

const getSortedSongs = (allSongs) =>
  Object.values(allSongs).sort((a, b) => a.id - b.id);

const playQueueReducer = (state = initialState, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, initialState, state);
  switch (action.type) {
    case RECEIVE_SONGS:
      nextState["allSongs"] = action.songs;
      if (nextState.queue.length === 0 && nextState.queueIds.length > 0) {
        nextState.queue = buildQueueFromIds(nextState.queueIds, action.songs);
      }
      if (nextState.played.length === 0 && nextState.playedIds.length > 0) {
        nextState.played = buildQueueFromIds(nextState.playedIds, action.songs);
      }
      return nextState;
    case SELECT_SONG:
      if (nextState.allSongs) {
        const allSongs = getSortedSongs(nextState.allSongs);
        const selectedIndex = allSongs.findIndex((song) => song.id === action.song.id);
        const queue = selectedIndex >= 0 ? allSongs.slice(selectedIndex) : [action.song];
        nextState.queue = queue;
        nextState.played = [];
        nextState.queueIds = queue.map((song) => song.id);
        nextState.playedIds = [];
        nextState.originalQueue = queue;
        nextState.isShuffled = false;
      }
      return nextState;
    case PLAY_NEXT:
      if (nextState.queue.length > 1) {
        const lastPlayed = nextState.queue.shift();
        nextState.played.push(lastPlayed);
        nextState.queueIds = nextState.queue.map((song) => song.id);
        nextState.playedIds = nextState.played.map((song) => song.id);
      }
      return nextState;
    case PLAY_PREVIOUS:
      if (nextState.played.length > 0) {
        const lastPlayed = nextState.played.pop();
        nextState.queue.unshift(lastPlayed);
        nextState.queueIds = nextState.queue.map((song) => song.id);
        nextState.playedIds = nextState.played.map((song) => song.id);
      }
      return nextState;
    case SHUFFLE:
      if (nextState.queue.length <= 1) return nextState;
      if (nextState.isShuffled) {
        nextState.queue = nextState.originalQueue;
        nextState.isShuffled = false;
      } else {
        const [current, ...rest] = nextState.queue;
        nextState.originalQueue = nextState.queue;
        nextState.queue = [current, ...shuffle(rest)];
        nextState.isShuffled = true;
      }
      nextState.queueIds = nextState.queue.map((song) => song.id);
      return nextState;
    case SET_QUEUE:
      nextState.queue = action.queue;
      nextState.queueIds = action.queue.map((song) => song.id);
      return nextState;
    case ADD_TO_QUEUE:
      if (!nextState.queue.find((song) => song.id === action.song.id)) {
        nextState.queue = [...nextState.queue, action.song];
        nextState.queueIds = nextState.queue.map((song) => song.id);
      }
      return nextState;
    case REMOVE_FROM_QUEUE:
      nextState.queue = nextState.queue.filter((song, index) => {
        if (index === 0) return true;
        return song.id !== action.songId;
      });
      nextState.queueIds = nextState.queue.map((song) => song.id);
      return nextState;
    case CLEAR_QUEUE:
      nextState.queue = [];
      nextState.played = [];
      nextState.queueIds = [];
      nextState.playedIds = [];
      return nextState;
    case REORDER_QUEUE:
      if (action.fromIndex === 0 || action.toIndex === 0) return nextState;
      const queue = [...nextState.queue];
      const [moved] = queue.splice(action.fromIndex, 1);
      queue.splice(action.toIndex, 0, moved);
      nextState.queue = queue;
      nextState.queueIds = queue.map((song) => song.id);
      return nextState;
    default:
      return state;
  }
};

export default playQueueReducer;
