import { createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducers/root_reducer";

const loadQueueState = () => {
  try {
    const serialized = window.localStorage.getItem("playQueue");
    if (!serialized) return {};
    const data = JSON.parse(serialized);
    return {
      playControls: {
        playQueue: {
          queueIds: data.queueIds || [],
          playedIds: data.playedIds || [],
          isShuffled: data.isShuffled || false,
        },
      },
    };
  } catch (e) {
    return {};
  }
};

const saveQueueState = (state) => {
  try {
    const playQueue = state.playControls && state.playControls.playQueue;
    if (!playQueue) return;
    const data = {
      queueIds: playQueue.queueIds || [],
      playedIds: playQueue.playedIds || [],
      isShuffled: playQueue.isShuffled || false,
    };
    window.localStorage.setItem("playQueue", JSON.stringify(data));
  } catch (e) {
    // ignore write errors (private mode, etc.)
  }
};

const configureStore = (preloadedState = {}) => {
  const store = createStore(
    rootReducer,
    { ...loadQueueState(), ...preloadedState },
    applyMiddleware(thunk)
  );
  store.subscribe(() => saveQueueState(store.getState()));
  return store;
};

export default configureStore;