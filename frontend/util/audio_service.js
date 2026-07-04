// Singleton audio service.
//
// PlayControls owns the single <audio id="audio-element"> element and calls
// attach()/detach() on mount/unmount. Everyone else that needs playback
// progress (TrackCardV3, NowPlayingFull) subscribes here instead of polling
// the DOM with their own setInterval loops, and VolumeControls uses
// setVolume() instead of writing to the element directly.
//
// The browser fires `timeupdate` ~4Hz during playback, which matches the old
// 250ms polling cadence, so no requestAnimationFrame loop is needed.

let audioEl = null;
const subscribers = new Set();

function computeSnapshot() {
  if (!audioEl) {
    return { currentTime: 0, duration: 0, progress: 0 };
  }
  const currentTime = audioEl.currentTime || 0;
  const duration = audioEl.duration || 0;
  const progress = duration ? currentTime / duration : 0;
  return { currentTime, duration, progress };
}

function notify() {
  if (subscribers.size === 0) return;
  const snapshot = computeSnapshot();
  subscribers.forEach((cb) => {
    try {
      cb(snapshot);
    } catch (e) {
      // A misbehaving subscriber must not break fan-out to the others.
    }
  });
}

// Single shared listener; fans out to every subscriber.
function handleTimeUpdate() {
  notify();
}

function attach(el) {
  if (!el) return;
  if (audioEl === el) return;
  // If a different element was attached, clean it up first.
  if (audioEl) {
    detach();
  }
  audioEl = el;
  audioEl.addEventListener("timeupdate", handleTimeUpdate);
  audioEl.addEventListener("durationchange", handleTimeUpdate);
  // Push an initial snapshot so subscribers that mounted before attach()
  // (or that need duration as soon as it's known) get fresh data.
  notify();
}

function detach() {
  if (!audioEl) return;
  audioEl.removeEventListener("timeupdate", handleTimeUpdate);
  audioEl.removeEventListener("durationchange", handleTimeUpdate);
  audioEl = null;
}

function subscribe(cb) {
  if (typeof cb !== "function") return () => {};
  subscribers.add(cb);
  // New subscribers immediately receive the current snapshot if an element
  // is attached.
  if (audioEl) {
    try {
      cb(computeSnapshot());
    } catch (e) {
      // ignore
    }
  }
  return function unsubscribe() {
    subscribers.delete(cb);
  };
}

function seek(seconds) {
  if (!audioEl) return;
  audioEl.currentTime = seconds;
}

function seekToFraction(fraction) {
  if (!audioEl) return;
  const duration = audioEl.duration;
  if (!duration) return;
  audioEl.currentTime = fraction * duration;
}

function getCurrentTime() {
  return audioEl ? audioEl.currentTime || 0 : 0;
}

function getDuration() {
  return audioEl ? audioEl.duration || 0 : 0;
}

function setVolume(v) {
  if (!audioEl) return;
  audioEl.volume = v;
}

// Escape hatch. May return null when nothing is attached.
function getElement() {
  return audioEl;
}

export default {
  attach,
  detach,
  subscribe,
  seek,
  seekToFraction,
  getCurrentTime,
  getDuration,
  setVolume,
  getElement,
};
