import { combineReducers } from "redux";
import entitiesReducer from "./entities_reducer";
import sessionReducer from "./session_reducer";
import errorsReducer from "./errors_reducer";
import uiReducer from "./ui_reducer";
import playControlsReducer from "./play_controls_reducer";

const rootReducer = combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    ui: uiReducer,
    playControls: playControlsReducer,
    errors: errorsReducer,
})

export default rootReducer;