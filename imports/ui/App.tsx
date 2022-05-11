import React from 'react';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {Hello} from './Hello';
import {Info} from './Info';

import Layout from "/imports/ui/layouts/Layout";

import Members from "/imports/ui/pages/members";
import Sessions from "/imports/ui/pages/sessions";

import Login from "/imports/ui/pages/Login";

export const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Members/>}/>
                <Route path="sessions" element={<Sessions/>}>
                    <Route path=":id"></Route>
                
                </Route>
            </Route>
            
            <Route path="/login" element={<Login/>}/>
        </Routes>
    </Router>
);
