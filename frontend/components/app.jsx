import React from "react";
import Navbar from "./navbar/navbar_container";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import { ProtectedRoute } from "../util/route_util";
import ModalContainer from "./modal/modal_container";
import SongShowContainer from "./songs/song_show_container";
import SongIndexContainer from "./songs/song_index_container";
// import TestContainer from "./dev_test/testing_temp";
import UserShow from "./users/user_show_container";
import NotFound from "./errors/404";
import SongFormContainer from "./songs/song_form_container";
import PlayControlsContainer from "./play_controls/play_controls_container";
import SplashHeader from "./splash/splash_header";

const App = () => (
  <div className="main">
    <ModalContainer />
    <Navbar />
    <div className="main-content">
      <Route exact path="/" component={SplashHeader} />
      <Switch>
        {/* <Route exact path="/" component={TestContainer} /> */}
        <Route exact path="/" component={SongIndexContainer} />
        <Route exact path="/users/:userId" component={UserShow} />
        <Route exact path="/songs/:songId" component={SongShowContainer} />
        <Route exact path="/songs" component={SongIndexContainer} />
        <ProtectedRoute exact path="/upload" component={SongFormContainer} />
        <Route exact path="/404" component={NotFound} />
        <Redirect path="*" to="/404" />
      </Switch>
    </div>
    <PlayControlsContainer />
  </div>
);

export default App;
