import { RECEIVE_SONGS } from "../actions/song_actions";
import { SELECT_SONG } from "../actions/current_song_actions";
import { PLAY_NEXT, PLAY_PREVIOUS } from "../actions/queue_actions";

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
      }
      return nextState;
    case PLAY_NEXT:
      // called after currently playing songs, and before loading next song.
      if (!nextState["played"]) {
        nextState["played"] = [];
      }
      if (nextState["queue"].length > 1) {
        // removes the top most (just played) song from the queue
        nextState["played"].push(nextState["queue"].pop());
      }
      console.log(nextState["played"], nextState["queue"]);
      return nextState;
    case PLAY_PREVIOUS:
      if (nextState["played"]){
        // puts the last played song back on top of the queue
        let lastPlayed = nextState["played"].pop();
        nextState["queue"].push(lastPlayed);
      }
      return nextState;
    default:
      return state;
  }
};

export default playQueueReducer;