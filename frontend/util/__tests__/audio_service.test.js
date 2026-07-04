import audioService from "../audio_service";

// Minimal fake <audio> element with a mutable currentTime/duration and a
// working addEventListener/removeEventListener/dispatch.
function makeAudioEl({ currentTime = 0, duration = 0 } = {}) {
  const listeners = {};
  return {
    currentTime,
    duration,
    volume: 1,
    addEventListener: jest.fn((type, cb) => {
      (listeners[type] = listeners[type] || []).push(cb);
    }),
    removeEventListener: jest.fn((type, cb) => {
      listeners[type] = (listeners[type] || []).filter((f) => f !== cb);
    }),
    // Test helper to fire an event.
    fire(type) {
      (listeners[type] || []).forEach((cb) => cb());
    },
    _listeners: listeners,
  };
}

afterEach(() => {
  // Ensure a clean singleton between tests.
  audioService.detach();
});

describe("audioService", () => {
  test("attach + subscribe delivers snapshots on timeupdate", () => {
    const el = makeAudioEl({ currentTime: 0, duration: 100 });
    audioService.attach(el);

    const cb = jest.fn();
    audioService.subscribe(cb);
    cb.mockClear(); // ignore the immediate on-subscribe snapshot

    el.currentTime = 25;
    el.fire("timeupdate");

    expect(cb).toHaveBeenCalledWith({
      currentTime: 25,
      duration: 100,
      progress: 0.25,
    });
  });

  test("attach registers a single timeupdate listener", () => {
    const el = makeAudioEl({ duration: 100 });
    audioService.attach(el);
    const timeupdateCalls = el.addEventListener.mock.calls.filter(
      ([type]) => type === "timeupdate"
    );
    expect(timeupdateCalls).toHaveLength(1);
  });

  test("new subscriber gets an immediate snapshot when attached", () => {
    const el = makeAudioEl({ currentTime: 10, duration: 40 });
    audioService.attach(el);

    const cb = jest.fn();
    audioService.subscribe(cb);

    expect(cb).toHaveBeenCalledWith({
      currentTime: 10,
      duration: 40,
      progress: 0.25,
    });
  });

  test("unsubscribe stops delivery", () => {
    const el = makeAudioEl({ duration: 100 });
    audioService.attach(el);

    const cb = jest.fn();
    const unsub = audioService.subscribe(cb);
    cb.mockClear();

    unsub();

    el.currentTime = 50;
    el.fire("timeupdate");

    expect(cb).not.toHaveBeenCalled();
  });

  test("progress is 0 when duration is 0 (avoids divide-by-zero)", () => {
    const el = makeAudioEl({ currentTime: 5, duration: 0 });
    audioService.attach(el);

    const cb = jest.fn();
    audioService.subscribe(cb);

    expect(cb).toHaveBeenCalledWith({
      currentTime: 5,
      duration: 0,
      progress: 0,
    });
  });

  test("detach removes the element listeners", () => {
    const el = makeAudioEl({ duration: 100 });
    audioService.attach(el);
    audioService.detach();

    expect(el.removeEventListener).toHaveBeenCalledWith(
      "timeupdate",
      expect.any(Function)
    );
    // After detach, firing does nothing / getters are null-safe.
    expect(audioService.getElement()).toBeNull();
  });

  describe("null-safety before attach", () => {
    test("getters return safe defaults", () => {
      expect(audioService.getCurrentTime()).toBe(0);
      expect(audioService.getDuration()).toBe(0);
      expect(audioService.getElement()).toBeNull();
    });

    test("seek / seekToFraction / setVolume do not throw", () => {
      expect(() => audioService.seek(10)).not.toThrow();
      expect(() => audioService.seekToFraction(0.5)).not.toThrow();
      expect(() => audioService.setVolume(0.5)).not.toThrow();
    });

    test("subscribe returns a working unsubscribe with no element", () => {
      const cb = jest.fn();
      const unsub = audioService.subscribe(cb);
      expect(cb).not.toHaveBeenCalled(); // no snapshot with nothing attached
      expect(() => unsub()).not.toThrow();
    });
  });

  describe("controls when attached", () => {
    test("seek sets currentTime", () => {
      const el = makeAudioEl({ duration: 100 });
      audioService.attach(el);
      audioService.seek(42);
      expect(el.currentTime).toBe(42);
    });

    test("seekToFraction multiplies by duration", () => {
      const el = makeAudioEl({ duration: 200 });
      audioService.attach(el);
      audioService.seekToFraction(0.5);
      expect(el.currentTime).toBe(100);
    });

    test("setVolume writes to the element", () => {
      const el = makeAudioEl({ duration: 100 });
      audioService.attach(el);
      audioService.setVolume(0.3);
      expect(el.volume).toBe(0.3);
    });
  });
});
