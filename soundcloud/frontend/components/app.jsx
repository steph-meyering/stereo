
import React from "react";
import GreetingContainer from "./greeting/greeting_container";
import SignupFormContainer from "./session_form/signup_form_container";
import LoginFormContainer from "./session_form/login_form_container";

const App = () => (
    <div>
        <header>
            <h1>(((Stereo)))</h1>
            <GreetingContainer />
            <h4>signup</h4>
            <SignupFormContainer />
            <h4>login</h4>
            <LoginFormContainer />
        </header>
    </div>
);

export default App;