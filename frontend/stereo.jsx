import React from "react";
import { createRoot } from "react-dom/client";
import { signup, login, logout } from "./actions/session_actions";
import configureStore from "./store/store";
import Root from "./components/root";
import { openModal } from "./actions/modal_actions";
import { fetchSongs } from "./util/song_api_util";
import { requestUsers, requestUser } from "./actions/user_actions";

document.addEventListener("DOMContentLoaded", () => {
  let store = configureStore();
  if (window.currentUser) {
    const preloadedState = {
      session: { id: window.currentUser.id },
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  }

  // TESTING START
  let userScript = document.getElementById("bootstrap-current-user");
  if(userScript) userScript.remove();
  // TESTING END

  const rootEl = document.getElementById("root");
  const root = createRoot(rootEl);
  root.render(<Root store={store} />);
});
