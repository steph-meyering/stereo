import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import songsReducer from "./songs_reducer";
import commentsReducer from "./comments_reducer";
import playlistsReducer from "./playlists_reducer";

const entitiesReducer = combineReducers({
    users: usersReducer,
    songs: songsReducer,
    comments: commentsReducer,
    playlists: playlistsReducer,
})

export default entitiesReducer;