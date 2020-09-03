import { RECEIVE_SONGS } from "../actions/song_actions";
import { SELECT_SONG } from "../actions/current_song_actions";
import { PLAY_NEXT, PLAY_PREVIOUS, SHUFFLE } from "../actions/queue_actions";
import { shuffle } from "lodash";

const playQueueReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_SONGS:
      if (!nextState["allSongs"]) {
        nextState["allSongs"] = action.songs;
      }
      return nextState;
    case SELECT_SONG:
      // generate song queue if there is none or is empty
      if (!nextState["queue"]) {
        let queue = [];
        for (let key in nextState["allSongs"]) {
          if (key >= action.song.id) {
            queue.push(nextState["allSongs"][key]);
          }
        }
        if (queue.length > 1) {
          queue = queue.reverse();
        }
        nextState["queue"] = queue;
        nextState["originalQueue"] = queue;
      }
      return nextState;
    case PLAY_NEXT:
      // called after currently playing songs, and before loading next song.
      if (!nextState["played"]) {
        nextState["played"] = [];
      }
      if (nextState["queue"].length > 1) {
        // removes the top most (just played) song from the queue
        let lastPlayed = nextState["queue"].pop()
        nextState["played"].push(lastPlayed);
        nextState["originalQueue"] = nextState["queue"]
      }
      return nextState;
    case PLAY_PREVIOUS:
      if (nextState["played"]) {
        // puts the last played song back on top of the queue
        let lastPlayed = nextState["played"].pop();
        nextState["queue"].push(lastPlayed);
      }
      return nextState;
    case SHUFFLE:
      if (nextState["originalQueue"] === nextState["queue"]){
        nextState["queue"] = shuffle(nextState["queue"]);
      } else {
        nextState["queue"] = nextState["originalQueue"];
      }
      return nextState;
    default:
      return state;
  }
};

export default playQueueReducer;
