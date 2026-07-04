import currentSongReducer from "../current_song_reducer";
import {
  SELECT_SONG,
  PLAY_PAUSE_SONG,
  SEEK,
} from "../../actions/current_song_actions";

const testSong = {
  id: 7,
  artist: "demo_user",
  fileUrl: "http://example.com/song.mp3",
  title: "Test Song",
  photoUrl: "http://example.com/cover.jpg",
};

describe("currentSongReducer", () => {
  test("SELECT_SONG populates song fields and starts playing", () => {
    const next = currentSongReducer(null, { type: SELECT_SONG, song: testSong });
    expect(next.id).toBe(7);
    expect(next.title).toBe("Test Song");
    expect(next.playing).toBe(true);
    expect(next.seek).toBe(false);
  });

  test("PLAY_PAUSE_SONG toggles playing without mutating prior state", () => {
    const state = Object.freeze({ ...testSong, playing: true, seek: false });
    const paused = currentSongReducer(state, { type: PLAY_PAUSE_SONG });
    expect(paused.playing).toBe(false);
    expect(state.playing).toBe(true);
    const resumed = currentSongReducer(Object.freeze(paused), { type: PLAY_PAUSE_SONG });
    expect(resumed.playing).toBe(true);
  });

  test("SEEK stores origin, position and a unique id", () => {
    const state = Object.freeze({ ...testSong, playing: true, seek: false });
    const next = currentSongReducer(state, {
      type: SEEK,
      origin: "waveform",
      position: 0.5,
    });
    expect(next.seek.origin).toBe("waveform");
    expect(next.seek.position).toBe(0.5);
    expect(next.seek.id).toEqual(expect.any(Number));
    const again = currentSongReducer(Object.freeze(next), {
      type: SEEK,
      origin: "waveform",
      position: 0.5,
    });
    expect(again.seek.id).not.toBe(next.seek.id);
  });

  test("unrelated actions reset a pending seek", () => {
    const state = Object.freeze({
      ...testSong,
      playing: true,
      seek: { origin: "waveform", position: 0.5, id: 0.1 },
    });
    const next = currentSongReducer(state, { type: "UNKNOWN" });
    expect(next.seek).toBe(false);
  });

  test("unrelated actions return the same state when no seek is pending", () => {
    const state = Object.freeze({ ...testSong, playing: true, seek: false });
    expect(currentSongReducer(state, { type: "UNKNOWN" })).toBe(state);
  });
});
