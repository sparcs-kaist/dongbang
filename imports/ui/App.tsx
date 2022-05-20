import {Meteor} from "meteor/meteor";

import React from 'react';
import "./index.css";
import "./theme.css";

import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";


import AppLayout from "/imports/ui/layouts/AppLayout";

import Members from "/imports/ui/pages/members";
import Member from "/imports/ui/pages/members/Member";

import Sessions from "/imports/ui/pages/sessions";

import Login from "/imports/ui/pages/Login";

import {useQueryData} from "/imports/common/hooks/useQueryData";
import {membersQuery} from "/imports/api/query/members";
import {useUser} from "/imports/common/hooks/useUser";

export const App = () => {
    const user = useUser();
    const members = useQueryData(membersQuery);
    
    return (
        <Router>
            <Routes>
                <Route index element={<Navigate to="/members" replace={true}/>}/>
                <Route path="/" element={<AppLayout/>}>
                    <Route path="members" element={<Members user={user} members={members}/>}>
                        <Route path=":username" element={<Member/>}/>
                    
                    </Route>
                    <Route path="sessions" element={<Sessions/>}>
                        <Route path=":id"/>
                    
                    </Route>
                </Route>
                
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Router>
    )
};
