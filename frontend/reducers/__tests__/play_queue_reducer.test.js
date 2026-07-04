import playQueueReducer from "../play_queue_reducer";
import { RECEIVE_SONGS } from "../../actions/song_actions";
import { SELECT_SONG } from "../../actions/current_song_actions";
import {
  PLAY_NEXT,
  PLAY_PREVIOUS,
  SHUFFLE,
  ADD_TO_QUEUE,
  REMOVE_FROM_QUEUE_INDEX,
  CLEAR_QUEUE,
  REORDER_QUEUE,
} from "../../actions/queue_actions";

const song = (id) => ({ id, title: `Song ${id}` });

// Freeze the state object AND its nested arrays so any reducer mutation throws.
const deepFreezeState = (state) => {
  Object.freeze(state.queue);
  Object.freeze(state.played);
  Object.freeze(state.queueIds);
  Object.freeze(state.playedIds);
  Object.freeze(state.originalQueue);
  return Object.freeze(state);
};

const buildState = (overrides = {}) =>
  deepFreezeState({
    allSongs: { 1: song(1), 2: song(2), 3: song(3), 4: song(4) },
    queue: [song(1), song(2), song(3)],
    played: [],
    queueIds: [1, 2, 3],
    playedIds: [],
    originalQueue: [song(1), song(2), song(3)],
    isShuffled: false,
    ...overrides,
  });

const expectIdsInSync = (state) => {
  expect(state.queueIds).toEqual(state.queue.map((s) => s.id));
  expect(state.playedIds).toEqual(state.played.map((s) => s.id));
};

describe("playQueueReducer", () => {
  test("returns the same state for unknown actions", () => {
    const state = buildState();
    expect(playQueueReducer(state, { type: "UNKNOWN" })).toBe(state);
  });

  describe("PLAY_NEXT", () => {
    test("moves the current song to played without mutating prior state", () => {
      const state = buildState();
      const next = playQueueReducer(state, { type: PLAY_NEXT });
      expect(next.queue.map((s) => s.id)).toEqual([2, 3]);
      expect(next.played.map((s) => s.id)).toEqual([1]);
      expectIdsInSync(next);
      // prior state untouched
      expect(state.queue.map((s) => s.id)).toEqual([1, 2, 3]);
      expect(state.played).toEqual([]);
    });

    test("no-ops when only one song remains", () => {
      const state = buildState({ queue: [song(1)], queueIds: [1] });
      const next = playQueueReducer(state, { type: PLAY_NEXT });
      expect(next.queue.map((s) => s.id)).toEqual([1]);
      expect(next.played).toEqual([]);
    });
  });

  describe("PLAY_PREVIOUS", () => {
    test("moves the last played song back to the queue front immutably", () => {
      const state = buildState({
        queue: [song(3)],
        played: [song(1), song(2)],
        queueIds: [3],
        playedIds: [1, 2],
      });
      const next = playQueueReducer(state, { type: PLAY_PREVIOUS });
      expect(next.queue.map((s) => s.id)).toEqual([2, 3]);
      expect(next.played.map((s) => s.id)).toEqual([1]);
      expectIdsInSync(next);
      expect(state.queue.map((s) => s.id)).toEqual([3]);
      expect(state.played.map((s) => s.id)).toEqual([1, 2]);
    });

    test("no-ops when nothing has been played", () => {
      const state = buildState();
      const next = playQueueReducer(state, { type: PLAY_PREVIOUS });
      expect(next.queue.map((s) => s.id)).toEqual([1, 2, 3]);
      expect(next.played).toEqual([]);
    });
  });

  describe("SELECT_SONG", () => {
    test("builds a queue from the selected song onward", () => {
      const state = buildState();
      const next = playQueueReducer(state, { type: SELECT_SONG, song: song(2) });
      expect(next.queue.map((s) => s.id)).toEqual([2, 3, 4]);
      expect(next.played).toEqual([]);
      expect(next.isShuffled).toBe(false);
      expectIdsInSync(next);
    });
  });

  describe("SHUFFLE", () => {
    test("keeps the current song first and toggles isShuffled", () => {
      const state = buildState();
      const next = playQueueReducer(state, { type: SHUFFLE });
      expect(next.isShuffled).toBe(true);
      expect(next.queue[0].id).toBe(1);
      expect(next.queue.map((s) => s.id).sort()).toEqual([1, 2, 3]);
      expectIdsInSync(next);
    });

    test("restores the original queue when un-shuffling", () => {
      const shuffled = playQueueReducer(buildState(), { type: SHUFFLE });
      const restored = playQueueReducer(deepFreezeState(shuffled), { type: SHUFFLE });
      expect(restored.isShuffled).toBe(false);
      expect(restored.queue.map((s) => s.id)).toEqual([1, 2, 3]);
    });
  });

  describe("ADD_TO_QUEUE", () => {
    test("appends the song immutably", () => {
      const state = buildState();
      const next = playQueueReducer(state, { type: ADD_TO_QUEUE, song: song(4) });
      expect(next.queue.map((s) => s.id)).toEqual([1, 2, 3, 4]);
      expectIdsInSync(next);
      expect(state.queue.length).toBe(3);
    });
  });

  describe("REMOVE_FROM_QUEUE_INDEX", () => {
    test("removes the song at the given index", () => {
      const state = buildState();
      const next = playQueueReducer(state, { type: REMOVE_FROM_QUEUE_INDEX, index: 1 });
      expect(next.queue.map((s) => s.id)).toEqual([1, 3]);
      expectIdsInSync(next);
    });

    test("index 0 (currently playing) is a no-op", () => {
      const state = buildState();
      const next = playQueueReducer(state, { type: REMOVE_FROM_QUEUE_INDEX, index: 0 });
      expect(next.queue.map((s) => s.id)).toEqual([1, 2, 3]);
    });

    test("out-of-range index is a no-op", () => {
      const state = buildState();
      const next = playQueueReducer(state, { type: REMOVE_FROM_QUEUE_INDEX, index: 9 });
      expect(next.queue.map((s) => s.id)).toEqual([1, 2, 3]);
    });
  });

  describe("CLEAR_QUEUE", () => {
    test("empties queue and played", () => {
      const state = buildState({ played: [song(4)], playedIds: [4] });
      const next = playQueueReducer(state, { type: CLEAR_QUEUE });
      expect(next.queue).toEqual([]);
      expect(next.played).toEqual([]);
      expect(next.queueIds).toEqual([]);
      expect(next.playedIds).toEqual([]);
    });
  });

  describe("REORDER_QUEUE", () => {
    test("moves a song between positions immutably", () => {
      const state = buildState();
      const next = playQueueReducer(state, { type: REORDER_QUEUE, fromIndex: 1, toIndex: 2 });
      expect(next.queue.map((s) => s.id)).toEqual([1, 3, 2]);
      expectIdsInSync(next);
      expect(state.queue.map((s) => s.id)).toEqual([1, 2, 3]);
    });

    test("cannot move the currently playing song", () => {
      const state = buildState();
      const next = playQueueReducer(state, { type: REORDER_QUEUE, fromIndex: 0, toIndex: 2 });
      expect(next.queue.map((s) => s.id)).toEqual([1, 2, 3]);
    });
  });

  describe("RECEIVE_SONGS", () => {
    test("rebuilds queue from persisted ids", () => {
      const state = buildState({
        allSongs: null,
        queue: [],
        played: [],
        queueIds: [2, 3],
        playedIds: [1],
      });
      const songs = { 1: song(1), 2: song(2), 3: song(3) };
      const next = playQueueReducer(state, { type: RECEIVE_SONGS, songs });
      expect(next.queue.map((s) => s.id)).toEqual([2, 3]);
      expect(next.played.map((s) => s.id)).toEqual([1]);
    });
  });
});
