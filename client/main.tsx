import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import {App} from '/imports/ui/App'

import "./sso/register";

import "/imports/db";
import "/imports/api/query";
import "/imports/api/methods"

Meteor.startup(() => {
    render(<App/>, document.getElementById('react-target'));
});
