import React from "react";
import Navbar from "./navbar/navbar_container";
import SignupFormContainer from "./session_form/signup_form_container";
import LoginFormContainer from "./session_form/login_form_container";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthRoute } from '../util/route_util'
import ModalContainer from "./modal/modal_container";
import SongShowContainer from "./songs/song_show_container";
import SongIndexContainer from "./songs/song_index_container";
import TestContainer from "./dev_test/testing_temp";
import UserShowContainer from "./users/user_show_container";
import NotFound from "./errors/404";

const App = () => (
    <div>
        <ModalContainer />
        <header >
            <Navbar />
            <Switch>
                <Route exact path="/" component={TestContainer} />
                <Route exact path="/users/:userId" component={UserShowContainer} />
                <Route exact path="/songs/:songId" component={SongShowContainer} />
                <Route exact path="/songs" component={SongIndexContainer} />
                <Route exact path="/404" component={NotFound} />
                <Redirect path='*' to='/404'/>
            </Switch>
        </header>
    </div>
);

export default App;