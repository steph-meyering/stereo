import { RECEIVE_SONGS } from "../actions/song_actions";
import { SELECT_SONG } from "../actions/current_song_actions";
import { PLAY_NEXT } from "../actions/queue_actions";

const playQueueReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_SONGS:
      if (!nextState["allSongs"]) {
        nextState["allSongs"] = action.songs;
        return nextState;
      }
    case SELECT_SONG:
      // generate song queue if there is none or is empty
      if (!nextState["queue"]){
        let queue = [];
        for (let key in nextState["allSongs"]){
          if (key >= action.song.id){
            queue.push(nextState["allSongs"][key])
          }
        }
        if (queue.length > 1){
          queue = queue.reverse();
        }
        nextState["queue"] = queue;
      }
      return nextState;
    case PLAY_NEXT:
      console.log(nextState["queue"].pop());
    default:
      return state;
  }
};

export default playQueueReducer;
// Create PLAY_NEXT action, then SHUFFLE and REPEAT