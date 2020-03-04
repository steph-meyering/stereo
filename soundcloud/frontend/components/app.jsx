import React from "react";
import GreetingContainer from "./greeting/greeting_container";
import SignupFormContainer from "./session_form/signup_form_container";
import LoginFormContainer from "./session_form/login_form_container";
import { Switch, Route } from "react-router-dom";
import { AuthRoute } from '../util/route_util'
import ModalContainer from "./modal/modal_container";

const App = () => (
    <div>
        <ModalContainer />
        <header>
            <h1>(((Stereo)))</h1>
            <GreetingContainer />
            <Switch>
                {/* <AuthRoute exact path="/login" component={LoginFormContainer} />
                <AuthRoute exact path="/signup" component={SignupFormContainer}/> */}
            </Switch>
        </header>
    </div>
);

export default App;