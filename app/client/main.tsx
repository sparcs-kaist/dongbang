import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { App } from "./App";

// import "./sso/register";

import "/imports";
import "./common/auth";

Meteor.startup(() => {
    render(<App />, document.getElementById("react-target"));
});
